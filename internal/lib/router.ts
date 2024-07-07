import { join } from "jsr:@std/path/join";
import { walk } from "jsr:@std/fs/walk";
import { globToRegExp } from "jsr:@std/path/glob-to-regexp"
import { extname } from "jsr:@std/path/extname";
import { relative } from "jsr:@std/path/relative";
import { SEPARATOR } from "jsr:@std/path/constants";
import { basename } from "jsr:@std/path/basename";

export async function buildRouter(cwd: string) {
    const pagesDir = join(cwd, "pages");
    let routerMap: Map<RegExp, object> = new Map([]);
    for await (const file of walk(cwd, {
        includeDirs: false,
        includeSymlinks: false,
        match: [globToRegExp(pagesDir)]
    })) {
        const name = file.name;
        const relativeName = relative(pagesDir, file.path);
        const filetype = extname(file.path).slice(1);
        const isServer = basename(file.path).split(".").includes("server");
        const path = resolvePath(relativeName);
        if (path) routerMap.set(globToRegExp(path, { globstar: true }), {
            name,
            type: filetype,
            server: isServer,
            original: path
        });
    }

    return routerMap;
}

export function getRouterParams(glob: string, path: string) {
    const globParts = glob.split("/");
    const pathParts = path.split("/");


};

const EXTENSIONS = [".js", ".ts", ".jsx", ".tsx"] as const;

export function resolvePath(path: string): string | undefined {
    if (path === "" || path === ".") throw new Error("Path must be a file");
    const pathSegments = path.split(path.includes(SEPARATOR) ? SEPARATOR : "/");
    if (EXTENSIONS.filter(ext => pathSegments[pathSegments.length - 1].endsWith(ext)).length > 0) {
        pathSegments[pathSegments.length - 1] = pathSegments[pathSegments.length - 1].replace(extname(pathSegments[pathSegments.length - 1]), "");
    }
    if (pathSegments[pathSegments.length - 1].endsWith(".server")) {
        pathSegments[pathSegments.length - 1] = pathSegments[pathSegments.length - 1].replace(extname(pathSegments[pathSegments.length - 1]), "");
    }

    if (pathSegments[pathSegments.length - 1] === "" || pathSegments[pathSegments.length - 1].startsWith(".")) return undefined;
    
    const resolved: string[] = [];
    for (const item of pathSegments) {
        if (item.startsWith("[") && item.endsWith("]")) {
            if (item.startsWith("[...")) resolved.push("**");
            else resolved.push("*");
        } else if (item === "index") {
            resolved.push("")
        } else {
            resolved.push(item);
        }
    }
    return `/${resolved.join("/")}`;
}
