/**
 * Builds the vendored Vite site into the deployable public/ directory.
 * Usage: node tools/build.mjs
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
    process.exit(1);
  }
}

if (!existsSync(join(root, 'node_modules'))) {
  console.log('• adcamp-webdesign-1: installing dependencies …');
  run('npm', ['ci']);
}

console.log('• adcamp-webdesign-1: building with Vite …');
run('npm', ['run', 'build']);

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });
cpSync(dist, publicDir, { recursive: true });
console.log('built public/ from dist');
