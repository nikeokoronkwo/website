import { watchConfig } from "npm:c12";
import { defaultConfig } from "../lib/config.ts"
import { mergeConfig } from "../lib/config.ts";
import { serveApp } from "../lib/server.tsx"

const cwd = Deno.cwd();
const dev = true;
// get config
const config = await watchConfig({
    name: "dyte",
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
      config = mergeConfig(newConfig.config, defaultConfig(), 'a');
      console.log("Config updated:\n" + diff.map((i) => i.toJSON()).join("\n"));

      
    },
});

// run server
serveApp(config.config, true)