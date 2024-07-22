import { join } from "jsr:@std/path";
import { NikeConfig } from "../config.ts";
import { ServerProdOptions } from "./options.ts";
import { getRouterParams } from "../router.ts";
import { RouterMap } from "../RouterMap.ts";
import { existsSync } from "jsr:@std/fs/exists";
import {
  convertSearchParams,
  errorHandler,
  renderClientPage,
  renderServerPage,
} from "./utils.tsx";
import { createError } from "../errors.ts";
// @deno-types="npm:@types/mime-types"
import { lookup } from 'npm:mime-types'

export default function serve(
  options: ServerProdOptions,
  config: NikeConfig,
  routerMap: RouterMap,
  components: Record<string, any>
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

        const component = components[routeInfo.original];

        if (routeInfo.server) {
          const serverReqObj = {
            req,
            ...reqObj,
          };
          // serve server route
          try {
            const v = await renderServerPage({
              routeInfo,
              options,
              reqObj: serverReqObj,
              component
            });
            return v;
          } catch (e) {
            const err = e as Error;
            console.error(err);
            throw createError({
              name: err.name,
              message: err.message,
              cause: err,
            });
          }
        } else {
          try {
            return await renderClientPage({ routeInfo, options, reqObj, config, component });
          } catch (e) {
            const err = e as Error;
            console.error(err);
            throw createError({
              name: err.name,
              message: err.message,
              cause: err,
            });
          }
          // serve client route with nanojsx
          
        }
      }

      const publicDir = join(
        "out",
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
        const publicFilePath = join(
          publicDir,
          pathname.startsWith("/") ? pathname.replace("/", "") : pathname
        );

        return new Response(Deno.readTextFileSync(publicFilePath), {
          headers: {
            "content-type": (lookup(publicFilePath) === false ? "text/plain" : lookup(publicFilePath)).toString(),
          }
        })
      }

      if (
        existsSync(
          join(
            options.outDir ?? ".",
            pathname.startsWith("/") ? pathname.replace("/", "") : pathname,
          ),
        )
      ) {
        const path = join(
          options.outDir ?? ".",
          pathname.startsWith("/") ? pathname.replace("/", "") : pathname,
        );

        return new Response(Deno.readTextFileSync(path), {
          headers: {
            "content-type": (lookup(path) === false ? "text/plain" : lookup(path)).toString(),
          }
        })
      }

      throw createError({
        statusCode: 404,
        name: "Page not Found",
        message: "The path at " + pathname + " cannot be found.",
      });
    },
    onListen({ port, hostname }) {
      console.log(`Server started at http://${hostname}:${port}`);
    },
    onError: errorHandler(options.pages.error),
  });
}
