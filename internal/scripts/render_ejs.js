#!/usr/bin/env deno

import { extname } from "jsr:@std/path/extname";
import { walkSync } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path/join";
import { relative } from "jsr:@std/path/relative";
import { SEPARATOR } from "jsr:@std/path/constants";
import { format } from "npm:prettier";

/**
 * @param {boolean} [mkjsFile] Make the javascript files
 * @returns {Promise<{[k: string]: { src: string; dest: string }}>}
 */
async function renderEjs(mkjsFile) {
  const cwd = Deno.cwd();

  const ejsDir = join(cwd, "internal", "templates");

  const ejsMap = {};

  // convert ejs files to main files
  for (
    const file of walkSync(ejsDir, {
      includeDirs: false,
      includeSymlinks: false,
    })
  ) {
    // ensure extension is .ejs
    if (extname(file.path) !== ".ejs") break;

    const content = Deno.readTextFileSync(file.path);
    if (mkjsFile ?? true) {
      const fileContents = `
      // generated file
      // DO NOT EDIT
  
      export default ${JSON.stringify(content)};
      `;

      try {
        await format(fileContents, { semi: true, parser: "babel" }).then(
          (formatted) => {
            Deno.writeTextFileSync(file.path.replace(".ejs", ".js"), formatted);
          },
        );
      } catch (_) {
        Deno.writeTextFileSync(file.path.replace(".ejs", ".js"), fileContents);
      }
    }

    ejsMap[relative(ejsDir, file.path).split(SEPARATOR).join("_")] = {
      src: JSON.stringify(content),
      dest: file.path.replace(".ejs", ".js"),
    };
  }

  return ejsMap;
}

const cwd = Deno.cwd();
const ejsMap = await renderEjs();
const map = Object.entries(ejsMap).map((e) => e[1].dest);
const ejsDir = join(cwd, "internal", "templates");

const mainExport = `${
  map.map((src) => {
    return `export { default as ${
      relative(ejsDir, src).replace(".js", "").split(SEPARATOR).join("_")
    }} from "./${relative(ejsDir, src)}";`;
  }).join("\n")
}`;

await Deno.writeTextFile(join(ejsDir, "ejs.js"), mainExport);

export default renderEjs;
