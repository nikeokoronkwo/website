import { extname } from "jsr:@std/path/extname";
import { exists, existsSync } from "jsr:@std/fs/exists";
import { walk } from "jsr:@std/fs/walk";
import { InternalError } from "./errors.ts";
import { join } from "jsr:@std/path/join";
import { toFileUrl } from "jsr:@std/path/to-file-url";
import { serve, serveDir } from "jsr:@std/http"

import { buildRouter, getRouterParams, RouteInfo } from "./router.ts";
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";
import { h } from "https://deno.land/x/nano_jsx@v0.1.0/core.ts";
import { NikeConfig } from "#module";
import { ServerProdOptions } from "./options/server_options.ts";
import { isAbsolute } from "jsr:@std/path/is-absolute";

type RouterMap = Map<RegExp, RouteInfo>;

export function serveApp(cwd: string, config: NikeConfig, routerMap: RouterMap, dev: boolean = true, prodOptions?: ServerProdOptions) {
  return Deno.serve({
    hostname: config.server?.host ?? "localhost",
    port: config.server?.port ?? 3000,
    handler: async (req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;

      const match = Array.from(routerMap.entries()).find((v) => {
        return v[0].test(pathname);
      });

      if (match) {
        const routeInfo = match[1];
        const reqObj = {
          path: pathname,
          hash: url.hash,
          params: getRouterParams(routeInfo.original, routeInfo.raw, pathname),
          query: convertSearchParams(url.searchParams),
          fullPath: pathname + url.search + url.hash,
        };

        if (routeInfo.server) {
          return await import(dev ? toFileUrl(join(cwd, "pages", routeInfo.raw)).href : (isAbsolute(routeInfo.fullPath) ? toFileUrl(routeInfo.fullPath).href : routeInfo.fullPath))
            .then((pagefile) => {
              return pagefile.default(req);
            });
        } else {
          const response = import(
            toFileUrl(join(cwd, "pages", routeInfo.raw)).href
          )
            .then((pagefile) => {
              const Page = pagefile.default.handler;

              const pageOut = renderSSR(() => <Page {...reqObj} />);

              return pageOut;
            });
          return new Response(await response, {
            headers: {
              "content-type": "text/html",
            },
          });
        }
      }

      const publicDir = join(cwd, config.publicDir ?? "public");
      if (existsSync(join(publicDir, pathname.startsWith('/') ? pathname.replace('/', '') : pathname))) {
        return await serveDir(req, {
          fsRoot: publicDir
        });
      }

      return new Response("Hello World");
    },
    onListen({ port, hostname }) {
      console.log(`Server started at http://${hostname}:${port}`);
    },
    onError(err) {
      const sysError = err instanceof InternalError;
      const error = sysError ? err as InternalError : new InternalError({});

      return new Response(error.message, {
        status: error.statusCode,
        statusText: error.name,
      });
    },
  });
}

function convertSearchParams(searchParams: URLSearchParams) {
  const obj: Record<string, any> = {};
  for (const p of searchParams) {
    const key = p[0];
    let value: any = p[1];
    if (value === "") value = "";
    if (value === "true") value = true;
    if (value === "false") value = false;
    else {
      try {
        value = parseInt(value);
      } catch (_) {
        try {
          value = parseFloat(value);
        } catch (_) { /* Do nothing */ }
      }
    }
    Object.defineProperty(obj, key, { value, writable: false });
  }

  return obj;
}
