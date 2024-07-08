import prod_config from "./prod_config.js";
import { mergeConfig, defaultConfig } from "../lib/config.ts";
import { serveApp } from "../lib/server.tsx"

const config = mergeConfig(prod_config, defaultConfig());

serveApp(config, false)