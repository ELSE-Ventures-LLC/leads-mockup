import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { findUnregisteredSiteDirs, isWithinRoot, parsePort, resolveRequestPath } from './site-lib.mjs';

test('parsePort accepts valid ranges and rejects malformed or overflowing values', () => {
  assert.equal(parsePort('8741', 14), 8741);
  for (const value of ['', 'abc', '12.5', '0', '-1', '65536']) {
    assert.throws(() => parsePort(value), /port/i);
  }
  assert.throws(() => parsePort('65535', 2), /do not fit/);
});

test('resolveRequestPath contains decoded traversal and handles malformed URLs', () => {
  const root = '/srv/mockup/public';
  assert.equal(resolveRequestPath(root, '/assets/app.js?x=1').path, join(root, 'assets/app.js'));
  assert.equal(resolveRequestPath(root, '/').path, join(root, 'index.html'));
  assert.equal(resolveRequestPath(root, '/%2e%2e/README.md').error, 403);
  assert.equal(resolveRequestPath(root, '/..%2f..%2fsecret').error, 403);
  assert.equal(resolveRequestPath(root, '/..%5c..%5csecret').error, 403);
  assert.equal(resolveRequestPath(root, '/%E0%A4%A').error, 400);
});

test('isWithinRoot rejects sibling paths and symlink targets can be detected canonically', () => {
  const base = mkdtempSync(join(tmpdir(), 'site-path-test-'));
  try {
    const root = join(base, 'public');
    const outside = join(base, 'secret.txt');
    mkdirSync(root);
    writeFileSync(outside, 'secret');
    symlinkSync(outside, join(root, 'link'));
    assert.equal(isWithinRoot(root, join(root, 'index.html')), true);
    assert.equal(isWithinRoot(root, outside), false);
    assert.equal(isWithinRoot(realpathSync(root), realpathSync(join(root, 'link'))), false);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('findUnregisteredSiteDirs checks repository contents instead of a fixed site count', () => {
  const base = mkdtempSync(join(tmpdir(), 'site-registry-test-'));
  try {
    mkdirSync(join(base, 'sites', 'adcamp-inc', 'registered'), { recursive: true });
    mkdirSync(join(base, 'sites', 'adcamp-inc', 'new-site'));
    mkdirSync(join(base, 'sites', '.ignored', 'not-a-site'), { recursive: true });
    const registered = [{ dir: 'sites/adcamp-inc/registered' }];
    assert.deepEqual(findUnregisteredSiteDirs(registered, base), ['sites/adcamp-inc/new-site']);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});
