import {
  basename,
  extname,
  globToRegExp,
  join,
  relative,
  SEPARATOR,
  walkSync,
} from "../deps.ts";

export interface RouteInfo {
  /** The name of the file/path route */
  name: string;
  /** The raw, unedited file for this path */
  raw: string;

  /** The file type for this route */
  type: string;

  /** Whether this is a server route */
  server: boolean;
  /** The original route path */
  original: string;

  /** The path of the file, either relative to the router or absolute mainly used during production */
  fullPath: string;
}

export function buildRouter(cwd: string) {
  const pagesDir = join(cwd, "pages");
  const routerMap: Map<RegExp, RouteInfo> = new Map([]);
  for (
    const file of walkSync(pagesDir, {
      includeDirs: false,
      includeSymlinks: false,
    })
  ) {
    const name = file.name;
    const relativeName = relative(pagesDir, file.path);
    const filetype = extname(file.path).slice(1);
    const isServer = basename(file.path).split(".").includes("server");
    const path = resolvePath(relativeName);
    if (path) {
      routerMap.set(globToRegExp(path, { globstar: true }), {
        name,
        raw: relativeName,
        type: filetype,
        server: isServer,
        original: path,
        fullPath: file.path,
      });
    }
  }
  return routerMap;
}

export function getRouterParams(glob: string, raw: string, path: string): {
  [k: string]: string | Array<string>;
} {
  // get separate parts
  const globParts = glob.slice(1).split("/");
  const pathParts = path.slice(1).split("/");
  const origParts = getPathParts(raw);

  // output object
  const output: {
    [k: string]: string | Array<string>;
  } = {};

  // iterate over glob parts and compare to actual parts for match
  for (let index = 0; index < globParts.length; index++) {
    const glob = globParts[index];
    if (glob === "*") {
      // add match via name from original path
      const key = origParts[index].replace("[", "").replace("]", "");
      output[key] = pathParts[index];
    } else if (glob === "**") {
      // add match list via name from original path
      const key = origParts[index].replace("[...", "").replace("]", "");
      output[key] = pathParts.slice(index);
      break;
    }
  }

  return output;
}

const EXTENSIONS = [".js", ".ts", ".jsx", ".tsx"] as const;

export function resolvePath(path: string): string | undefined {
  if (path === "" || path === ".") throw new Error("Path must be a file");

  // get path parts
  const pathSegments = getPathParts(path);

  if (
    pathSegments[pathSegments.length - 1] === "" ||
    pathSegments[pathSegments.length - 1].startsWith(".")
  ) return undefined;

  // set resolved list
  const resolved: string[] = [];

  // iterate over and add items to list
  for (const item of pathSegments) {
    // parametrized paths - replaced with "*" (single parameter) or "**" (multiple/catch-all)
    if (item.startsWith("[") && item.endsWith("]")) {
      if (item.startsWith("[...")) resolved.push("**");
      else resolved.push("*");
    } else if (item === "index") {
      // index replaced as empty path
      resolved.push("");
    } else {
      resolved.push(item);
    }
  }
  return `/${resolved.join("/")}`;
}

function getPathParts(path: string) {
  const pathSegments = path.split(path.includes(SEPARATOR) ? SEPARATOR : "/");
  if (
    EXTENSIONS.filter((ext) =>
      pathSegments[pathSegments.length - 1].endsWith(ext)
    ).length > 0
  ) {
    pathSegments[pathSegments.length - 1] =
      pathSegments[pathSegments.length - 1].replace(
        extname(pathSegments[pathSegments.length - 1]),
        "",
      );
  }
  if (pathSegments[pathSegments.length - 1].endsWith(".server")) {
    pathSegments[pathSegments.length - 1] =
      pathSegments[pathSegments.length - 1].replace(
        extname(pathSegments[pathSegments.length - 1]),
        "",
      );
  }
  return pathSegments;
}
