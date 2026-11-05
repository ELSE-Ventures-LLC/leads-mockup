/**
 * build.mjs — installs deps and runs the Vite build for the vendored
 * `app/` React project, then syncs its dist/ output into ../public/.
 * Usage: node tools/build.mjs   (from sites/adcamp-inc/adcamp-inc-first-design/)
 */
import { existsSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, 'app');
const dist = join(app, 'dist');
const publicDir = join(root, 'public');

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: app, stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`\n✖ "${cmd} ${args.join(' ')}" failed in ${app}\n`);
    process.exit(1);
  }
}

if (!existsSync(join(app, 'node_modules'))) {
  console.log('• adcamp-inc-first-design: installing app/ dependencies …');
  run('npm', ['ci']);
}

console.log('• adcamp-inc-first-design: building app/ with Vite …');
run('npm', ['run', 'build']);

rmSync(publicDir, { recursive: true, force: true });
mkdirSync(publicDir, { recursive: true });
cpSync(dist, publicDir, { recursive: true });
console.log('built public/ from app/dist');
