#!/usr/bin/env node
/** One command surface for every mockup in tools/sites.registry.mjs. */
import { existsSync, readFileSync } from 'node:fs';
import { readFile, realpath } from 'node:fs/promises';
import { createServer } from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { networkInterfaces } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findUnregisteredSiteDirs, isWithinRoot, parsePort, resolveRequestPath, validateRegistry } from './site-lib.mjs';
import { SITE_KINDS, sites } from './sites.registry.mjs';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_PORT = 8741;
const WRANGLER = join(REPO, 'node_modules', 'wrangler', 'bin', 'wrangler.js');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8',
};

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function findSite(slug) {
  const match = sites.find((site) => site.slug === slug);
  if (!match) fail(`No site named "${slug}".\nKnown sites:\n${sites.map((s) => `  • ${s.slug}`).join('\n')}`);
  return match;
}

function selectedSites(slugs, { requireExplicit = false } = {}) {
  if (!slugs.length) {
    if (requireExplicit) fail('Specify at least one site slug for this command.');
    return sites;
  }
  return slugs.map(findSite);
}

function absoluteSite(site) {
  return { ...site, dir: resolve(REPO, site.dir), output: resolve(REPO, site.dir, site.output) };
}

function run(spec, label) {
  const executable = spec.executable === 'node' ? process.execPath : spec.executable;
  const result = spawnSync(executable, spec.args, {
    cwd: resolve(REPO, spec.cwd), stdio: 'inherit', env: process.env,
  });
  if (result.error) fail(`${label}: could not run ${executable}: ${result.error.message}`);
  if (result.status !== 0) fail(`${label} failed (exit ${result.status ?? 'unknown'})`);
}

function install(site) {
  if (!site.install) return console.log(`• ${site.slug}: no dependencies.`);
  console.log(`• ${site.slug}: installing dependencies …`);
  run(site.install, `${site.slug} install`);
}

function build(site) {
  if (!site.build) return console.log(`• ${site.slug}: static assets are ready.`);
  console.log(`• ${site.slug}: building ${site.kind} …`);
  run(site.build, `${site.slug} build`);
  if (!existsSync(resolve(REPO, site.dir, site.output))) fail(`${site.slug}: build did not create ${site.output}`);
}

function quality(site, check) {
  if (!site.quality) return console.log(`• ${site.slug}: no source project; skipping ${check}.`);
  const cwd = resolve(REPO, site.quality.cwd);
  const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
  let spec;
  if (check === 'typecheck') {
    const hasTypeScript = packageJson.dependencies?.typescript || packageJson.devDependencies?.typescript;
    if (!hasTypeScript) return console.log(`• ${site.slug}: no TypeScript dependency; skipping typecheck.`);
    spec = site.quality.manager === 'bun'
      ? { cwd: site.quality.cwd, executable: 'bun', args: ['x', 'tsc', '--noEmit'] }
      : { cwd: site.quality.cwd, executable: 'npm', args: ['exec', '--', 'tsc', '--noEmit'] };
  } else {
    if (!packageJson.scripts?.[check]) return console.log(`• ${site.slug}: no ${check} script; skipping.`);
    spec = { cwd: site.quality.cwd, executable: site.quality.manager, args: ['run', check] };
  }
  console.log(`• ${site.slug}: running ${check} …`);
  run(spec, `${site.slug} ${check}`);
}

function validate() {
  const errors = validateRegistry(sites, REPO);
  for (const dir of findUnregisteredSiteDirs(sites, REPO)) errors.push(`unregistered site directory: ${dir}`);
  for (const site of sites) {
    if (!SITE_KINDS.has(site.kind)) errors.push(`${site.slug}: unknown kind ${site.kind}`);
    if (!existsSync(resolve(REPO, site.dir, site.deployConfig)) && site.kind !== 'tanstack-worker') {
      errors.push(`${site.slug}: missing ${site.deployConfig}`);
    }
    if (site.dev.mode === 'static' && !existsSync(resolve(REPO, site.dir, site.output, 'index.html'))) {
      errors.push(`${site.slug}: missing ${site.output}/index.html`);
    }
  }
  if (errors.length) fail(`registry validation failed:\n${errors.map((e) => `  • ${e}`).join('\n')}`);
  console.log(`✓ Registry contains ${sites.length} valid sites and covers every site directory.`);
}

function lanAddress() {
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses || []) {
      if (address.family === 'IPv4' && !address.internal) return address.address;
    }
  }
  return null;
}

async function safeRead(root, candidate) {
  const canonicalRoot = await realpath(root);
  const canonicalCandidate = await realpath(candidate);
  if (!isWithinRoot(canonicalRoot, canonicalCandidate)) {
    const error = new Error('Forbidden');
    error.code = 'EACCES';
    throw error;
  }
  return readFile(canonicalCandidate);
}

async function startStatic(site, port) {
  build(site);
  const root = site.output;
  const indexPath = join(root, 'index.html');
  if (!existsSync(indexPath)) fail(`${site.slug}: ${indexPath} is missing.`);

  const server = createServer(async (req, res) => {
    const resolved = resolveRequestPath(root, req.url);
    if (resolved.error) {
      res.writeHead(resolved.error, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end(resolved.message);
    }
    try {
      const body = await safeRead(root, resolved.path);
      res.writeHead(200, {
        'content-type': MIME[extname(resolved.path)] || 'application/octet-stream',
        'x-content-type-options': 'nosniff',
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      if (error.code === 'EACCES') {
        res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
        return res.end('Forbidden');
      }
      try {
        const body = await safeRead(root, indexPath);
        res.writeHead(200, { 'content-type': MIME['.html'], 'x-content-type-options': 'nosniff' });
        res.end(req.method === 'HEAD' ? undefined : body);
      } catch {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('404');
      }
    }
  });
  await new Promise((ok, reject) => {
    server.once('error', reject);
    server.listen(port, '0.0.0.0', ok);
  });
  return { close: () => server.close(), process: null };
}

async function startCommand(site, port) {
  const executable = site.dev.executable;
  const args = [...site.dev.args, '--host', '0.0.0.0', '--port', String(port), '--strictPort'];
  const child = spawn(executable, args, { cwd: site.dir, stdio: 'inherit', env: process.env });
  await new Promise((ok, reject) => {
    const timer = setTimeout(ok, 750);
    child.once('error', (error) => { clearTimeout(timer); reject(error); });
    child.once('exit', (code) => {
      clearTimeout(timer);
      if (code !== 0) reject(new Error(`dev server exited with code ${code}`));
      else ok();
    });
  });
  return { close: () => child.kill('SIGTERM'), process: child };
}

async function dev(chosen, basePort) {
  parsePort(basePort, chosen.length);
  const started = [];
  for (let index = 0; index < chosen.length; index++) {
    const site = absoluteSite(chosen[index]);
    const port = basePort + index;
    try {
      const handle = site.dev.mode === 'static'
        ? await startStatic(site, port)
        : await startCommand(site, port);
      started.push({ site, port, handle });
    } catch (error) {
      for (const entry of started) entry.handle.close();
      fail(`could not start ${site.slug} on port ${port}: ${error.message}`);
    }
  }
  const lan = lanAddress();
  console.log(`\n  Serving ${started.length} site${started.length === 1 ? '' : 's'}:\n`);
  for (const { site, port } of started) {
    console.log(`  ${site.slug.padEnd(28)} ${`http://localhost:${port}`.padEnd(26)} ${lan ? `http://${lan}:${port}` : ''}`);
  }
  console.log(`\n  Ctrl+C to stop${started.length > 1 ? ' all' : ''}.\n`);
  const stop = () => { for (const entry of started) entry.handle.close(); };
  process.once('SIGINT', () => { stop(); process.exit(0); });
  process.once('SIGTERM', () => { stop(); process.exit(0); });
}

async function pickSites() {
  if (!process.stdin.isTTY) return sites;
  return new Promise((done) => {
    const selected = new Set(sites.map((_, index) => index));
    let cursor = 0;
    let lines = 0;
    const render = (first = false) => {
      if (!first) process.stdout.write(`\x1b[${lines}A\x1b[0J`);
      const rows = ['', '  Select sites (↑↓ move · Space toggle · a all/none · Enter start)', ''];
      sites.forEach((site, index) => rows.push(
        `  ${cursor === index ? '›' : ' '} ${selected.has(index) ? '\x1b[32m◉\x1b[0m' : '\x1b[2m◯\x1b[0m'}  ${site.slug.padEnd(28)} \x1b[2m${site.company}\x1b[0m`
      ));
      rows.push('', `  ${selected.size || 'All'} site${selected.size === 1 ? '' : 's'} selected`, '');
      process.stdout.write(rows.join('\n') + '\n');
      lines = rows.length;
    };
    const finish = () => {
      process.stdin.setRawMode(false); process.stdin.pause(); process.stdout.write('\n');
      done(selected.size ? [...selected].sort((a, b) => a - b).map((i) => sites[i]) : sites);
    };
    render(true); process.stdin.setRawMode(true); process.stdin.resume(); process.stdin.setEncoding('utf8');
    process.stdin.on('data', (key) => {
      if (key === '\r' || key === '\n') return finish();
      if (key === '\x03') { process.stdin.setRawMode(false); process.exit(0); }
      if (key === '\x1b[A') cursor = (cursor - 1 + sites.length) % sites.length;
      else if (key === '\x1b[B') cursor = (cursor + 1) % sites.length;
      else if (key === ' ') selected.has(cursor) ? selected.delete(cursor) : selected.add(cursor);
      else if (key.toLowerCase() === 'a') selected.size === sites.length ? selected.clear() : sites.forEach((_, i) => selected.add(i));
      else return;
      render();
    });
  });
}

function deploy(site, dryRun = false, { buildFirst = true } = {}) {
  if (!existsSync(WRANGLER)) fail('Wrangler is not installed. Run `npm ci` at the repository root.');
  if (buildFirst) build(site);
  const config = resolve(REPO, site.dir, site.deployConfig);
  if (!existsSync(config)) fail(`${site.slug}: build did not create ${site.deployConfig}`);
  console.log(`• ${site.slug}: ${dryRun ? 'validating' : 'deploying'} with Cloudflare …`);
  const args = [WRANGLER, 'deploy'];
  if (site.deployEntry) args.push(site.deployEntry);
  args.push('--config', config);
  if (site.deployAssets) args.push('--assets', site.deployAssets);
  if (dryRun) args.push('--dry-run');
  const result = spawnSync(process.execPath, args, { cwd: resolve(REPO, site.dir), stdio: 'inherit' });
  if (result.status !== 0) fail(`${site.slug} ${dryRun ? 'deploy check' : 'deploy'} failed`);
}

function checkGeneratedOutput() {
  const paths = sites.filter((site) => site.trackedOutput).map((site) => join(site.dir, site.output));
  const result = spawnSync('git', ['status', '--porcelain=v1', '--', ...paths], {
    cwd: REPO, encoding: 'utf8', env: process.env,
  });
  if (result.error) fail(`could not inspect generated output: ${result.error.message}`);
  if (result.status !== 0) fail(`git status failed while inspecting generated output (exit ${result.status ?? 'unknown'})`);
  if (result.stdout.trim()) {
    fail(`generated output is stale; rebuild and commit these paths:\n${result.stdout.trimEnd()}`);
  }
  console.log(`✓ ${paths.length} tracked build outputs match their committed snapshots.`);
}

function list() {
  console.log('\nSites:\n');
  for (const site of sites) console.log(`  ${site.slug.padEnd(28)} ${site.company.padEnd(30)} [${site.kind}]`);
  console.log('');
}

const command = process.argv[2];
const args = process.argv.slice(3);
const slugs = [];
let rawPort = process.env.PORT ?? DEFAULT_PORT;
for (let index = 0; index < args.length; index++) {
  if (args[index] === '--port' || args[index] === '-p') {
    if (index + 1 >= args.length) fail(`${args[index]} requires a value`);
    rawPort = args[++index];
  } else if (args[index].startsWith('-')) fail(`Unknown option: ${args[index]}`);
  else slugs.push(args[index]);
}

const usage = `Usage:\n  node tools/site.mjs list\n  node tools/site.mjs validate\n  node tools/site.mjs install [<slug> …]\n  node tools/site.mjs lint|typecheck|test [<slug> …]\n  node tools/site.mjs build [<slug> …]\n  node tools/site.mjs generated-check\n  node tools/site.mjs dev [<slug> …] [--port ${DEFAULT_PORT}]\n  node tools/site.mjs deploy <slug> …\n  node tools/site.mjs deploy-check [<slug> …]\n  node tools/site.mjs deploy-check-built [<slug> …]\n`;

switch (command) {
  case 'list': list(); break;
  case 'validate': validate(); break;
  case 'install': for (const site of selectedSites(slugs)) install(site); break;
  case 'lint': case 'typecheck': case 'test':
    for (const site of selectedSites(slugs)) quality(site, command);
    break;
  case 'build': for (const site of selectedSites(slugs)) build(site); break;
  case 'generated-check':
    if (slugs.length) fail('generated-check does not accept site slugs.');
    checkGeneratedOutput();
    break;
  case 'dev': case 'serve': {
    const chosen = slugs.length ? slugs.map(findSite) : await pickSites();
    let port;
    try { port = parsePort(rawPort, chosen.length); } catch (error) { fail(error.message); }
    await dev(chosen, port);
    break;
  }
  case 'deploy': for (const site of selectedSites(slugs, { requireExplicit: true })) deploy(site); break;
  case 'deploy-check': for (const site of selectedSites(slugs)) deploy(site, true); break;
  case 'deploy-check-built': for (const site of selectedSites(slugs)) deploy(site, true, { buildFirst: false }); break;
  default: console.log(usage); process.exit(command ? 1 : 0);
}
