import { watchConfig } from "npm:c12";
import { defaultConfig } from "../lib/config.ts";
import { mergeConfig } from "../lib/config.ts";
import serve from "../lib/server/devServer.ts";
import { buildRouter } from "../lib/router.ts";
import { delay } from "jsr:@std/async/delay";

const cwd = Deno.cwd();
const dev = true;

/** @type {Deno.HttpServer} */
let server;
// get config
const config = await watchConfig({
  name: "nike",
  defaultConfig: defaultConfig(),
  cwd,
  onWatch: (event) => {
    console.log("[watcher]", event.type, event.path);
  },
  acceptHMR({ oldConfig, newConfig, getDiff }) {
    const diff = getDiff();
    if (diff.length === 0) {
      console.log("No config changed detected!");
      return true; // No changes!
    }
  },
  onUpdate({ oldConfig, newConfig, getDiff }) {
    const diff = getDiff();
    config = mergeConfig(newConfig.config, defaultConfig(), "a");
    console.log("Config updated:\n" + diff.map((i) => i.toJSON()).join("\n"));

    server.shutdown();
    delay(800).then(() => {
      const routerMap = buildRouter(cwd);
      server = serveApp(cwd, config.config, routerMap, true);
    });
  },
});

const routerMap = buildRouter(cwd);

const tailwindOutput = "./styles/output.css";

const cmd = new Deno.Command(Deno.execPath(), {
  args: [
    "run",
    "-A",
    "npm:tailwindcss",
    "-i",
    config.config.tailwind.path ?? "./styles/tailwind.css",
    "-o",
    tailwindOutput,
    "--watch",
  ],
});
const process = cmd.spawn();

// run server
server = serve(cwd, config.config, routerMap);
