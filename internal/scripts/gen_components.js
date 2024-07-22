import { join } from "jsr:@std/path/join";
import { walk } from "jsr:@std/fs/walk";
import { relative } from "jsr:@std/path/relative";
import { normalize } from "jsr:@std/path/normalize";
import { SEPARATOR } from "jsr:@std/path/constants";
import { extname } from "jsr:@std/path/extname";
import { basename } from "jsr:@std/path@^0.225.1/basename";
import { exists } from "jsr:@std/fs/exists";

const cwd = Deno.cwd();
const componentDir = join(cwd, "components");
const componentExportFile = join(componentDir, "index.tsx");

if (await exists(componentExportFile)) await Deno.remove(componentExportFile);

let componentExportFileData = ``;

// walk over files
for await (
  const component of walk(componentDir, {
    includeDirs: false,
    includeSymlinks: false,
  })
) {
  if (basename(component.path) === "index.tsx") continue;

  const relPath = relative(componentDir, component.path);
  const content = await Deno.readTextFile(component.path);
  if (content.includes("export default ")) {
    componentExportFileData += `export { default as ${
      pascalCase(relPath)
    } } from "./${relPath.replaceAll("\\", "\\\\")}";\n`;
  }
  componentExportFileData += `export * from "./${
    relPath.replaceAll("\\", "\\\\")
  }";\n`;
}

await Deno.writeTextFile(componentExportFile, componentExportFileData);

/**
 * @param {string} src
 */
function pascalCase(src) {
  return normalize(src).replace(extname(src), "").split(SEPARATOR).filter((p) =>
    p !== ".." && p !== "."
  ).map((segment) => {
    const v = segment.split("");
    v[0] = v[0].toUpperCase();
    return v.join("");
  }).join("");
}
