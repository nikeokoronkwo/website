// two options
// 1. Bundle as single file
// 2. Perform dynamic import for page files (code splitting)

import {
  basename,
  bold,
  // commonjsPlugin,
  delay,
  denoPlugins,
  dim,
  exists,
  extname,
  join,
  loadConfig,
  parseArgs,
  relative,
  walk,
} from "../deps.ts";
import { esbuild } from "../esbuild.ts";
import { Logger } from "../lib/logger.ts";
import { Runner } from "../lib/runner.ts";
import { defaultConfig } from "../lib/config.ts";
import renderEjs from "../scripts/render_ejs.js";
import { buildRouter } from "../lib/router.ts";
import deno from "../../deno.json" with { type: "json" };

import { builtinModules } from "node:module";

import "../lib/meta/prod.js";


const args = parseArgs(Deno.args, {
  boolean: ["single", "verbose"],
  default: { single: true, verbose: false },
});

const logger = args.verbose ? Logger.verbose() : new Logger();
const runner = new Runner(logger);
console.log(bold("Building the Production Server"));

// set constants
logger.info("Setting up");
const cwd = Deno.cwd();
const outDir = join(cwd, "out");
const outClientDir = join(outDir, "client");

// const scriptsDir = join(cwd, "internal", "scripts");
const templateDir = join(cwd, "internal", "templates");

// setting up output
if (await exists(outDir)) {
  logger.info("Cleaning up previous build(s)");
  await Deno.remove(outDir, { recursive: true });
}
await Deno.mkdir(outDir, { recursive: true });

await Deno.mkdir(outClientDir, { recursive: true });

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
logger.info("Components...");
await runner.run(Deno.execPath(), [
  "run",
  "-A",
  "internal/scripts/gen_components.js",
]);
logger.fine("Done");

logger.info("Pages...");
await runner.run(Deno.execPath(), [
  "run",
  "-A",
  "internal/scripts/gen_routes.js",
]);
logger.fine("Done");

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

// tailwind
logger.info("Bundling Tailwind Classes");
logger.warn("NOTE: Future uses of this tool will make use of PostCSS");
const tailwindOutput = join(outDir, "client", "output.css");
await runner.run(Deno.execPath(), [
  "run",
  "-A",
  "npm:tailwindcss",
  "-i",
  config.tailwind.path ?? "./styles/tailwind.css",
  "-o",
  tailwindOutput,
  "--minify",
]);

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
    tailwind: "./${relative(outDir, tailwindOutput)}"
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
const routerMap = buildRouter(cwd);

await Deno.mkdir(outClientDir, { recursive: true });

if (args.single) {
  // skip
  logger.info("Single Build -- Pages Not Rendered Separately ");
} else {
  await esbuild.build({
    entryPoints: Array.from(routerMap.entries()).map((e) => e[1].fullPath),
    bundle: true,
    outdir: outClientDir,
    format: "esm",
    jsx: "automatic",
    jsxImportSource: deno.compilerOptions.jsxImportSource,
    plugins: [
      ...denoPlugins({
        configPath: join(cwd, "deno.json"),
      }),
      commonjsPlugin(),
    ],
  });

  for (const [k, v] of Array.from(routerMap.entries())) {
    const newV = v;
    newV.fullPath = relative(cwd, v.fullPath).replace("pages", "./client")
      .replace(extname(v.fullPath), ".js");
    routerMap[k] = newV;
  }

  // TODO: Exclude all these specific file rendering and do it in a configurable way
  Deno.writeTextFileSync(
    join(outDir, "client/blog/[name]/index.server.js"),
    Deno.readTextFileSync(
      join(outDir, "client/blog/[name]/index.server.js"),
    ).replaceAll('from "url"', 'from "node:url"').replaceAll(
      'from "fs"',
      'from "node:fs"',
    ).replaceAll('from "path"', 'from "node:path"'),
  );

  logger.fine("Bundled Pages!");
}

// if not then create imports and import into server file

// build router map
logger.info("Building Router");
const routerMapString = Array.from(routerMap.entries()).map((e) =>
  `[${e[0]}, {
  name: "${e[1].name}",
  raw: "${e[1].raw}",
  type: "${e[1].type}",
  server: ${e[1].server ? "true" : "false"},
  original: "${e[1].original}",
  fullPath: "${e[1].fullPath.replaceAll("\\", "\\\\")}",
}]`
).join(", ");
await Deno.writeTextFile(
  "./internal/runners/prod_router.js",
  `export default new Map([${routerMapString}])`,
);
logger.fine("Router built");

await delay(800);

// public dir
logger.info("Bundling Public files");
await Deno.mkdir(join(outClientDir, "public"));
for await (
  const item of walk(config.publicDir ?? "./public", {
    includeDirs: false,
    includeSymlinks: false,
  })
) {
  logger.info(
    dim(
      `Copying ${item.path} to ${
        join(outClientDir, "public", basename(item.path))
      }`,
    ),
  );
  await Deno.copyFile(
    item.path,
    join(outClientDir, "public", basename(item.path)),
  );
}

// bundling assets
logger.info("Bundling Assets");
logger.warn("Assets are only copied at the moment");
await Deno.mkdir(join(outDir, "assets"));
await Deno.mkdir(join(outDir, "assets", "svg"));
await Deno.mkdir(join(outDir, "assets", "images"));
for await (
  const item of walk(join(cwd, "assets", "images"), {
    includeDirs: false,
    includeSymlinks: false,
  })
) {
  logger.info(
    dim(
      `Copying ${item.path} to ${
        join(outClientDir, "public", basename(item.path))
      }`,
    ),
  );
  await Deno.copyFile(
    item.path,
    join(outDir, relative(cwd, item.path)),
  );
}

// bundling svgs
logger.info("Using SVGO to optimize SVGs");
await runner.run(Deno.execPath(), [
  "run",
  "-A",
  "npm:svgo",
  "-f",
  join(cwd, "assets", "svg"),
  "-o",
  join(outDir, "assets", "svg"),
]);

// bundling content
logger.info("Bundling Content");
logger.warn("Content are only copied at the moment");
await Deno.mkdir(join(outDir, "content"));
await Deno.mkdir(join(outDir, "content", "blog"));
for await (
  const item of walk(join(cwd, "content"), {
    includeDirs: false,
    includeSymlinks: false,
  })
) {
  logger.info(
    dim(
      `Copying ${item.path} to ${
        join(outClientDir, "public", basename(item.path))
      }`,
    ),
  );
  await Deno.copyFile(
    item.path,
    join(outDir, relative(cwd, item.path)),
  );
}

// build server
logger.info("Building Server");
const serverFile = join(runnersDir, "prod_server.js");

/**
 * @todo export this to dyte
 * @see {@link https://github.com/nikeokoronkwo/dyte}
 * 
 * @type {string[]}
 */
const builtins = builtinModules;

const filter = new RegExp(`^(${builtins.join('|')})$`) ;

/** @type {esbuild.Plugin} */
const nodeImportPlugin = {
    name: "node-import-resolver",
    setup(build) {
      build.onResolve({ filter: /^node:/ }, (args) => {
        // console.log(args);
        return { path: args.path, external: true };
      });

      
        // build.onResolve({ filter: /^crypto/ }, (args) => {
        //   console.log(args, args.path);
        //   return { path: "node:" + args.path, external: true };
        // });
    }    
}

const output = await esbuild.build({
  entryPoints: [serverFile],
  outfile: join(outDir, "server.js"),
  metafile: true,
  bundle: true,
  format: "esm",
  jsx: "automatic",
  loader: {
    ".node": "file",
  },
  external: ['esbuild', 'https://deno.land/x/esbuild/mod.js', "npm:esbuild"],
  jsxImportSource: deno.compilerOptions.jsxImportSource,
  plugins: [
    ...denoPlugins({
      configPath: join(cwd, "deno.json"),
    }), nodeImportPlugin
  ],
});

Deno.writeTextFileSync("./foo.json", JSON.stringify(output.metafile));

logger.info("Resolving node imports")
let newLocal = Deno.readTextFileSync(
  join(outDir, "server.js")
);

for (const b of builtinModules) {
  newLocal = newLocal.replaceAll(`from "${b}"`, `from "node:${b}"`)
}

Deno.writeTextFileSync(
  join(outDir, "server.js"),
  newLocal
);

logger.info("Minifying Server");
await esbuild.build({
  entryPoints: [join(outDir, "server.js")],
  outfile: join(outDir, "server.min.js"),
  minify: true,
  plugins: [nodeImportPlugin],
});

logger.fine(`Server built at ${join(outDir, "server.js")}`);
Deno.exit(0);
