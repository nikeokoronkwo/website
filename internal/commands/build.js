// two options
// 1. Bundle as single file
// 2. Perform dynamic import for page files (code splitting)

import { join } from "jsr:@std/path/join";
import { Logger } from "../lib/logger.ts";
import { Runner } from "../lib/runner.ts";
import { bold } from "jsr:@std/fmt/colors";
import { relative } from "jsr:@std/path/relative";
import { exists } from "jsr:@std/fs/exists";
import { walk } from "jsr:@std/fs/walk";

const logger = new Logger();
const runner = new Runner(logger);
console.log(bold("Building the Production Server"));

// set constants
logger.info("Setting up")
const cwd = Deno.cwd();
const outDir = join(cwd, "out");
const filePath = import.meta.filename ?? join(cwd, "internal", "commands", "build.js");

const scriptsDir = join(cwd, "internal", "scripts");
const templateDir = join(cwd, "internal", "templates");

// run scripts
logger.info("Running Scripts")

logger.info("Rendering EJS Templates")
if (await exists(join(templateDir, "ejs.js"))) {
    logger.info("Cleaning up build");
    for await (const file of walk(templateDir, { includeDirs: false, includeSymlinks: false })) {

    }
}
await runner.run(Deno.execPath(), ["run", "-A", "./internal/scripts/render_ejs.js"]);

// render ejs

// build router map

// build production options

// write to files

// if prerendering is set to true then bundle files

// if not then create imports and import into server file

// build server

