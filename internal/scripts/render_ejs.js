#!/usr/bin/env deno

import { extname } from "jsr:@std/path/extname";
import { walkSync } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path/join";
import { format } from "npm:prettier";

const cwd = Deno.cwd();
const ejsDir = join(cwd, "internal", "templates");

// convert ejs files to main files
for (
  const file of walkSync(ejsDir, { includeDirs: false, includeSymlinks: false })
) {
  // ensure extension is .ejs
  if (extname(file.path) !== ".ejs") break;

  let content = Deno.readTextFileSync(file.path);
  const fileContents = `
    // generated file
    // DO NOT EDIT

    export default \`${content}\`;
    `;
  await format(fileContents, { semi: true, parser: "babel" }).then(
    (formatted) => {
      Deno.writeTextFileSync(file.path.replace(".ejs", ".js"), formatted);
    },
  );
}
