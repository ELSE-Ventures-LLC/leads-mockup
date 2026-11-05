import { existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

export function parsePort(value, count = 1) {
  const text = String(value ?? '');
  if (!/^\d+$/.test(text)) throw new Error(`invalid port "${text}"`);
  const port = Number(text);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new Error(`port must be an integer from 1 to 65535 (received "${text}")`);
  }
  if (port + Math.max(0, count - 1) > 65535) {
    throw new Error(`${count} sites do not fit starting at port ${port}`);
  }
  return port;
}

export function isWithinRoot(root, candidate) {
  const absoluteRoot = resolve(root);
  const absoluteCandidate = resolve(candidate);
  return absoluteCandidate === absoluteRoot || absoluteCandidate.startsWith(absoluteRoot + sep);
}

/** Convert an HTTP request target to a contained filesystem path. */
export function resolveRequestPath(root, requestTarget) {
  const rawPath = String(requestTarget || '/').split('?', 1)[0];
  let pathname;
  try {
    pathname = decodeURIComponent(rawPath);
  } catch {
    return { error: 400, message: 'Malformed URL' };
  }
  // Backslashes are path separators on Windows and should never bypass containment.
  pathname = pathname.replaceAll('\\', '/');
  if (pathname.includes('\0')) return { error: 400, message: 'Malformed URL' };
  if (pathname === '/' || pathname.endsWith('/')) pathname += 'index.html';

  const candidate = resolve(root, pathname.replace(/^\/+/, ''));
  if (!isWithinRoot(root, candidate)) return { error: 403, message: 'Forbidden' };
  return { path: candidate };
}

export function validateRegistry(sites, repo) {
  const errors = [];
  const slugs = new Set();
  for (const site of sites) {
    if (slugs.has(site.slug)) errors.push(`duplicate slug: ${site.slug}`);
    slugs.add(site.slug);
    if (!site.slug || !site.company || !site.kind || !site.dir) {
      errors.push(`incomplete registry entry: ${JSON.stringify(site)}`);
      continue;
    }
    const dir = resolve(repo, site.dir);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) errors.push(`${site.slug}: missing ${site.dir}`);
    if (!site.deployConfig) errors.push(`${site.slug}: missing deployConfig`);
    if (!site.output) errors.push(`${site.slug}: missing output`);
    if (site.deployAssets && !site.deployEntry) errors.push(`${site.slug}: deployAssets requires deployEntry`);
    if (!site.dev?.mode) errors.push(`${site.slug}: missing dev mode`);
    if (site.quality && (!site.quality.cwd || !['npm', 'bun'].includes(site.quality.manager))) {
      errors.push(`${site.slug}: invalid quality specification`);
    }
    for (const spec of [site.install, site.build]) {
      if (spec && (!spec.cwd || !spec.executable || !Array.isArray(spec.args))) {
        errors.push(`${site.slug}: invalid command specification`);
      }
    }
  }
  return errors;
}

/** Find second-level site directories that are missing from the explicit registry. */
export function findUnregisteredSiteDirs(sites, repo) {
  const registeredDirs = new Set(sites.map((site) => site.dir));
  const sitesRoot = resolve(repo, 'sites');
  const unregistered = [];
  for (const company of readdirSync(sitesRoot, { withFileTypes: true })) {
    if (!company.isDirectory() || company.name.startsWith('.')) continue;
    const companyDir = resolve(sitesRoot, company.name);
    for (const candidate of readdirSync(companyDir, { withFileTypes: true })) {
      if (!candidate.isDirectory() || candidate.name.startsWith('.')) continue;
      const relativeDir = `sites/${company.name}/${candidate.name}`;
      if (!registeredDirs.has(relativeDir)) unregistered.push(relativeDir);
    }
  }
  return unregistered.sort();
}
