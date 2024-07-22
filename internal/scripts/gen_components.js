import {
  basename,
  exists,
  extname,
  join,
  normalize,
  relative,
  SEPARATOR,
  walk,
} from "../deps.ts";

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
