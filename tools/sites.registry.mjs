/**
 * Explicit inventory for every deployable mockup in this repository.
 *
 * Paths are relative to the repository root. The parent directory is the
 * company: a slug of its name in the admin app.
 * Keeping this data explicit avoids guessing an application's architecture
 * from incidental folders such as `public/`.
 */
export const SITE_KINDS = new Set([
  'static',
  'generated-static',
  'vite-spa',
  'tanstack-worker',
]);

export const sites = [
  staticSite('adcamp-inc-first-design', 'adcamp-inc', {
    kind: 'generated-static',
    build: nodeBuild('sites/adcamp-inc/adcamp-inc-first-design'),
    install: npmInstall('sites/adcamp-inc/adcamp-inc-first-design/app'),
    quality: npmQuality('sites/adcamp-inc/adcamp-inc-first-design/app'),
    trackedOutput: true,
  }),
  viteSite('adcamp-webdesign-1', 'adcamp-inc'),
  viteSite('adcamp-webdesign-3-decent', 'adcamp-inc'),
  staticSite('agentconsulting', 'agent-consulting', {
    kind: 'generated-static',
    build: nodeBuild('sites/agent-consulting/agentconsulting'),
    install: npmInstall('sites/agent-consulting/agentconsulting/app'),
    quality: npmQuality('sites/agent-consulting/agentconsulting/app'),
    trackedOutput: true,
  }),
  staticSite('editorial-authority', 'brandon-comer'),
  staticSite('typographic-minimal', 'brandon-comer'),
  staticSite('midstate-construction', 'mid-state-construction', {
    kind: 'generated-static',
    build: nodeBuild('sites/mid-state-construction/midstate-construction'),
    trackedOutput: true,
  }),
  staticSite('buford-plumbing', 'buford-plumbing-company-inc'),
  workerSite('newcrestimage-2', 'newcrest-image'),
  workerSite('newcrestimage-mockup', 'newcrest-image'),
  staticSite('complete-lawn-service-ms', 'complete-lawn-service-ms-llc'),
  {
    ...viteSite('maxlittlejohn', 'max-littlejohn'),
    // This project's Worker config intentionally deploys the generated public/ snapshot.
    build: nodeBuild('sites/max-littlejohn/maxlittlejohn'),
    output: 'public',
    trackedOutput: true,
  },
  staticSite('new-orleans-grill', 'new-orleans-grill'),
  workerSite('customcarting', 'custom-carting'),
].sort((a, b) => a.slug.localeCompare(b.slug));

function siteDir(company, slug) {
  return `sites/${company}/${slug}`;
}

function command(cwd, executable, args) {
  return { cwd, executable, args };
}

function npmInstall(cwd) {
  return command(cwd, 'npm', ['ci']);
}

function npmQuality(cwd) {
  return { cwd, manager: 'npm' };
}

function bunQuality(cwd) {
  return { cwd, manager: 'bun' };
}

function bunInstall(cwd) {
  return command(cwd, 'bun', ['install', '--frozen-lockfile']);
}

function nodeBuild(cwd) {
  return command(cwd, 'node', ['tools/build.mjs']);
}

function staticSite(slug, company, overrides = {}) {
  const dir = siteDir(company, slug);
  return {
    slug,
    company,
    kind: 'static',
    dir,
    output: 'public',
    build: null,
    install: null,
    dev: { mode: 'static' },
    deployConfig: 'wrangler.jsonc',
    ...overrides,
  };
}

function viteSite(slug, company) {
  const dir = siteDir(company, slug);
  return {
    slug,
    company,
    kind: 'vite-spa',
    dir,
    output: 'dist',
    install: npmInstall(dir),
    quality: npmQuality(dir),
    build: command(dir, 'npm', ['run', 'build']),
    dev: { mode: 'command', executable: 'npm', args: ['run', 'dev', '--'] },
    deployConfig: 'wrangler.jsonc',
  };
}

function workerSite(slug, company, overrides = {}) {
  const dir = siteDir(company, slug);
  return {
    slug,
    company,
    kind: 'tanstack-worker',
    dir,
    output: 'dist/server',
    install: bunInstall(dir),
    quality: bunQuality(dir),
    build: command(dir, 'bun', ['run', 'build']),
    dev: { mode: 'command', executable: 'bun', args: ['run', 'dev', '--'] },
    // The Cloudflare Vite plugin emits the deployable Worker configuration.
    deployConfig: 'dist/server/wrangler.json',
    ...overrides,
  };
}
