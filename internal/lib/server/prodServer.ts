import { join } from "jsr:@std/path";
import { NikeConfig } from "../config.ts";
import { ServerProdOptions } from "./options.ts";
import { getRouterParams } from "../router.ts";
import { RouterMap } from "../RouterMap.ts";
import { existsSync } from "jsr:@std/fs/exists";
import { serveDir } from "jsr:@std/http/file-server";
import {
  convertSearchParams,
  errorHandler,
  renderClientPage,
  renderServerPage,
} from "./utils.tsx";
import { createError } from "../errors.ts";

export default function serve(
  options: ServerProdOptions,
  config: NikeConfig,
  routerMap: RouterMap,
) {
  return Deno.serve({
    hostname: config.server?.host ?? "localhost",
    port: config.server?.port ?? 3000,
    handler: async (req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;

      const match = Array.from(routerMap.entries()).find((v) => {
        return v[0].test(pathname);
      });

      // serve page routes
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
          const serverReqObj = {
            req,
            ...reqObj
          }
          // serve server route
          return await renderServerPage({ routeInfo, options, reqObj: serverReqObj });
        } else {
          // serve client route with nanojsx
          return await renderClientPage({ routeInfo, options, reqObj, config });
        }
      }

      const publicDir = join(
        join(options.outDir, "client"),
        config.publicDir ?? "public",
      );
      if (
        existsSync(
          join(
            publicDir,
            pathname.startsWith("/") ? pathname.replace("/", "") : pathname,
          ),
        )
      ) {
        return await serveDir(req, {
          fsRoot: publicDir,
        });
      }

      // if (pathname.replace("/", "").endsWith(".css")) {
      //   const path = pathname.replace("/", "");

      // }

      throw createError({
        statusCode: 404,
        message: "Page not Found",
      });
    },
    onListen({ port, hostname }) {
      console.log(`Server started at http://${hostname}:${port}`);
    },
    onError: errorHandler(options.pages.error),
  });
}
