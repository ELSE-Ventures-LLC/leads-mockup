/**
 * Builds the vendored Vite app and prepares static assets for Cloudflare Workers.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`\n✖ \"${command} ${args.join(' ')}\" failed in ${root}\n`);
    process.exit(result.status || 1);
  }
}

if (!existsSync(join(root, 'node_modules'))) {
  console.log('• adcamp-webdesign-3-decent: installing dependencies …');
  run('npm', ['ci']);
}

console.log('• adcamp-webdesign-3-decent: building Vite app …');
run('npm', ['run', 'build']);

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });
cpSync(dist, publicDir, { recursive: true });
console.log('built public/ from dist');
