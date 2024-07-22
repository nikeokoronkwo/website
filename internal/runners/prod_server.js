import prod_config from "./prod_config.js";
import prod_options from "./prod_options.js";
import prod_router from "./prod_router.js";
import { defaultConfig, mergeConfig } from "../lib/config.ts";
import serve from "../lib/server/prodServer.ts";
import components from "../../pages/main.tsx";

const config = mergeConfig(prod_config, defaultConfig());

const server = serve(prod_options, config, prod_router, components);
server.finished.then(() => console.log("Done"));
