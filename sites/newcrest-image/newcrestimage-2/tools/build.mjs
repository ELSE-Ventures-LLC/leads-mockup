/** Builds the TanStack Start Cloudflare Worker bundle. */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`\n✖ \"${command} ${args.join(" ")}\" failed in ${root}\n`);
    process.exit(result.status || 1);
  }
}

if (!existsSync(join(root, "node_modules"))) {
  console.log("• newcrestimage-2: installing dependencies …");
  run("bun", ["install"]);
}

console.log("• newcrestimage-2: building TanStack Start app …");
run("bun", ["run", "build"]);
