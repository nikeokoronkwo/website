import prod_config from "./prod_config.js";
import prod_options from "./prod_options.js";
import prod_router from "./prod_router.js";
import { defaultConfig, mergeConfig } from "../lib/config.ts";
import { serveApp } from "../lib/server.tsx";

const cwd = Deno.cwd();
const config = mergeConfig(prod_config, defaultConfig());

const server = serveApp(cwd, config, prod_router, false, prod_options);
server.finished.then(() => console.log("Done"));