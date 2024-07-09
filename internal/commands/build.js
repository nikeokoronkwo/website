// two options
// 1. Bundle as single file
// 2. Perform dynamic import for page files (code splitting)

import { join } from "jsr:@std/path/join";
import { Logger } from "../lib/logger.ts";
import { Runner } from "../lib/runner.ts";
import { blue, bold, dim, green } from "jsr:@std/fmt/colors";
import { relative } from "jsr:@std/path/relative";
import { exists } from "jsr:@std/fs/exists";
import { walk } from "jsr:@std/fs/walk";
import { extname } from "jsr:@std/path";
import { loadConfig } from "npm:c12";
import { defaultConfig } from "../lib/config.ts";
import renderEjs from "../scripts/render_ejs.js";
import { buildRouter } from "../lib/router.ts";
import deno from "../../deno.json" with { type: "json" };
import { bundle } from "https://deno.land/x/emit/mod.ts";

async function hash(message) {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return hashHex;
}

const logger = new Logger();
const runner = new Runner(logger);
console.log(bold("Building the Production Server"));

// set constants
logger.info("Setting up");
const cwd = Deno.cwd();
const outDir = join(cwd, "out");
const filePath = import.meta.filename ??
  join(cwd, "internal", "commands", "build.js");

const scriptsDir = join(cwd, "internal", "scripts");
const templateDir = join(cwd, "internal", "templates");

// setting up output
if (await exists(outDir)) {
  logger.info("Cleaning up previous build(s)");
  await Deno.remove(outDir, { recursive: true });
}
await Deno.mkdir(outDir, { recursive: true });

// get config
logger.info(`Loading config`);
const parsedConfig = await loadConfig({
  name: "nike",
  defaultConfig: defaultConfig(),
});

/** @type {import("../lib/config.ts").NikeConfig} */
const config = parsedConfig.config;

if (!config) config = generateConfig(options, args);

// run scripts
logger.info("Running Scripts");

// render ejs
logger.info("Rendering EJS Templates");
if (
  await exists(join(templateDir, "ejs.js")) ||
  await exists(join(templateDir, "main.js"))
) {
  logger.info("Cleaning up build");
  for await (
    const file of walk(templateDir, {
      includeDirs: false,
      includeSymlinks: false,
    })
  ) {
    if (extname(file.path) === ".js") {
      logger.info(dim(`Removing ${file.path}`));
      try {
        await Deno.remove(file.path);
      } catch (_) { /* ignore */ }
    }
  }
}

// await runner.run(Deno.execPath(), ["run", "-A", "./internal/scripts/render_ejs.js"]);
const ejsMap = await renderEjs(false);
logger.fine("EJS Rendered!");

// run other scripts

// build router map
logger.info("Building Router")
const routerMap = buildRouter(cwd);
const routerMapString = Array.from(routerMap.entries()).map(e => `[${e[0]}, {
  name: "${e[1].name}",
  raw: "${e[1].raw}",
  type: "${e[1].type}",
  server: ${e[1].server ? "true" : "false"},
  original: "${e[1].original}",
  fullPath: "${e[1].fullPath}",
}]`).join(", ")
Deno.writeTextFile("./internal/runners/prod_router.js", `export default new Map([${routerMapString}])`)
logger.fine("Router built")

// build production options
const stringProdOptions = `{
    pages: {
        main: ${ejsMap["main.ejs"].src},
        error: ${ejsMap["error.ejs"].src}
    },
    ejs: {${
  Object.entries(
    Object.entries(ejsMap).reduce(
      (a, v) => ({ ...a, [v[0].replace(".ejs", "")]: v[1].src }),
      {},
    ),
  ).map((e) => `${e[0]}: ${e[1]}`).join(", ")
}},
    outDir: ".",
}`;

// write to files
logger.info("Setting up runners");
const runnersDir = join(cwd, "internal", "runners");
const prodOptionsFile = join(runnersDir, "prod_options.js");
const prodConfigFile = join(runnersDir, "prod_config.js");

logger.info("Setting up production options");
await Deno.writeTextFile(
  prodOptionsFile,
  `export default ${stringProdOptions};`,
);

logger.info("Setting up production config");
await Deno.writeTextFile(
  prodConfigFile,
  `export default ${JSON.stringify(config)};`,
);

// if prerendering is set to true then bundle files
logger.info("Bundling Code for Production");

const outClientDir = join(outDir, "client");
await Deno.mkdir(outClientDir, { recursive: true });

let totalSize = 0;

if (!(config.build.singleBundle ?? false)) {
  // prerender
  logger.info("Bundling Page Chunks");
  for (const v of Array.from(routerMap.values())) {
    const path = v.fullPath;
    const { code, map } = await bundle(path, {
      minify: true,
      compilerOptions: deno.compilerOptions,
      importMap: {
        baseUrl: cwd,
        imports: deno.imports,
      },
    });
    const newFileName = (await hash(v.fullPath)).slice(0, 10);
    // get file size in kilobytes for logging
    const fileSize = new Blob([code], { type: "application/javascript" }).size /
      1024;

    logger.info(
      green(
        `${newFileName}.js -- ${
          fileSize < 0.5
            ? `${fileSize.toFixed(2)}KB`
            : `${(fileSize * 1024).toFixed(2)}B`
        }`,
      ),
      "--",
      blue("page route"),
    );

    totalSize += fileSize;

    await Deno.writeTextFile(join(outClientDir, `${newFileName}.js`), code);

    v.fullPath = `${join(".", "client", `${newFileName}.js`)}`;
  }
}
logger.fine("Bundled Pages!");
logger.info(green(`Total Size -- ${bold(totalSize.toFixed(2))}KB`));
// if not then create imports and import into server file

// build server
logger.info("Building Server");
const serverFile = join(runnersDir, "prod_server.js");
const { code } = await bundle(serverFile, {
  minify: true,
  compilerOptions: deno.compilerOptions
});

await Deno.writeTextFile(join(outDir, "server.js"), code);
logger.fine(`Server built at ${join(outDir, "server.js")}`);
