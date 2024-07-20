import { existsSync } from "jsr:@std/fs/exists";
import { createError } from "../errors.ts";
import { join } from "jsr:@std/path";
import { serveDir } from "jsr:@std/http";

import { getRouterParams } from "../router.ts";
import { NikeConfig } from "../config.ts";
import { RouterMap } from "../RouterMap.ts";
import {
  convertSearchParams,
  errorHandler,
  renderClientPage,
  renderServerPage,
} from "./utils.tsx";
import { serveFile } from "jsr:@std/http/file-server";

export default function serveApp(
  cwd: string,
  config: NikeConfig,
  routerMap: RouterMap,
) {
  const tailwind = "output.css";
  return Deno.serve({
    hostname: config.server?.host ?? "localhost",
    port: config.server?.port ?? 3000,
    handler: async (req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;

      // serve tailwind css
      if (pathname === tailwind || pathname === `/${tailwind}`) {
        return new Response(await Deno.readTextFile("./styles/output.css"), {
          headers: { "content-type": "text/css" },
        });
      }

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
          // serve server route
          return await renderServerPage({ cwd, routeInfo, req });
        } else {
          // serve client route with nanojsx
          const v = await renderClientPage({ cwd, routeInfo, reqObj, config });
          console.log(v.body);
          return v;
        }
      }

      const publicDir = join(
        cwd,
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

      if (
        existsSync(
          join(
            cwd,
            pathname.startsWith("/") ? pathname.replace("/", "") : pathname,
          ),
        )
      ) {
        return await serveFile(
          req,
          join(
            cwd,
            pathname.startsWith("/") ? pathname.replace("/", "") : pathname,
          ),
        );
      }

      throw createError({
        statusCode: 404,
        message: "Page not Found",
      });
    },
    onListen({ port, hostname }) {
      console.log(`Server started at http://${hostname}:${port}`);
    },
    onError: errorHandler(),
  });
}
