import prod_config from "./prod_config.js";
import prod_options from "./prod_options.js";
import { mergeConfig, defaultConfig } from "../lib/config.ts";
import { serveApp } from "../lib/server.tsx"

const config = mergeConfig(prod_config, defaultConfig());

server = serveApp(cwd, prod_config, routerMap, true, prod_options);