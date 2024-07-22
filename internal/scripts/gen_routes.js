import { join } from "jsr:@std/path/join";
import { walk } from "jsr:@std/fs/walk";
import { relative } from "jsr:@std/path/relative";
import { normalize } from "jsr:@std/path/normalize";
import { SEPARATOR } from "jsr:@std/path/constants";
import { extname } from "jsr:@std/path/extname";
import { basename } from "jsr:@std/path@^0.225.1/basename";
import { exists } from "jsr:@std/fs/exists";
import { resolvePath } from "~/internal/lib/router.ts";

const cwd = Deno.cwd();
const pages = join(cwd, "pages");
const pagesExportFile = join(pages, "main.tsx");

if (await exists(pagesExportFile)) await Deno.remove(pagesExportFile);

let pagesExportFileData = ``;

// map of glob to component
const pageRoutes = new Map([]);

// walk over files
for await (
  const component of walk(pages, {
    includeDirs: false,
    includeSymlinks: false,
  })
) {
  if (basename(component.path) === "main.tsx") continue;

  const relPath = relative(pages, component.path);

  const newLocal = pascalCase(relPath);
  console.log(newLocal);
  pagesExportFileData += `import ${newLocal} from "./${relPath.replaceAll("\\", "\\\\")}";\n`;
  pageRoutes.set(resolvePath(relPath), newLocal);
}

pagesExportFileData += `\n
export default {
    ${Array.from(pageRoutes.entries()).map(v => {
        return `"${v[0]}": ${v[1]},`;
    }).join("\n")}
};
`

await Deno.writeTextFile(pagesExportFile, pagesExportFileData);

/**
 * @param {string} src
 */
function pascalCase(src) {
  return normalize(src).replace(extname(src), "").split(SEPARATOR).filter((p) =>
    p !== ".." && p !== "."
  ).map((segment) => {
    const v = segment.split("");
    if (v[0] === "[") {
        if (v[1] === ".") v.splice(0, 3);
        else v.splice(0, 1);

        v.splice(v.length - 1, 1);
    }
    if (v.includes(".")) v.splice(v.indexOf("."), 1);
    v[0] = v[0].toUpperCase();
    return v.join("");
  }).join("");
}
