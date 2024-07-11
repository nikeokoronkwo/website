import { join } from "jsr:@std/path/join";
import { walk } from "jsr:@std/fs/walk";
import { relative } from "jsr:@std/path/relative";
import { normalize } from "jsr:@std/path/normalize";

const cwd = Deno.cwd();
const componentDir = join(cwd, "components");
const componentExportFile = join(componentDir, "index.tsx");

let componentExportFileData = ``;

// walk over files
for await (const component of walk(componentDir, { includeDirs: false, includeSymlinks: false })) {
    const relPath = relative(componentExportFile, component.path);
    const content = await Deno.readTextFile(component.path);
    if (content.includes("export default ")) {
        componentExportFileData += `export *, { default as ${pascalCase(relPath)} } from "${relPath}";`
    } else {
        componentExportFileData += `export * from "${relPath}";`
    }
    componentExportFileData += "\n";
}

await Deno.writeTextFile(componentExportFile, componentExportFileData);

/**
 * 
 * @param {string} src 
 */
function pascalCase(src) {
    return normalize(src).split(SEPARATOR).filter(p => p !== ".." && p !== ".").map((segment, index) => {
        const v = segment;
        v[0] = v[0].toUpperCase();
        return v;
    }).join("");
}