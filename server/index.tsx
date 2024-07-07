/** @jsx h */
import { extname } from "jsr:@std/path/extname";
import { exists } from "jsr:@std/fs/exists";
import { walk } from "jsr:@std/fs/walk";
import { InternalError } from "../internal/lib/errors.ts";
import { join } from "jsr:@std/path/join";

import { buildRouter, getRouterParams } from "../internal/lib/router.ts"
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";
import { render } from "https://deno.land/x/nano_jsx@v0.1.0/core.ts";
import { h } from "https://deno.land/x/nano_jsx@v0.1.0/core.ts";

const cwd = Deno.cwd();
const publicPath = "./public";

const routerMap = buildRouter(cwd);

Deno.serve({
    handler: async (req) => {
        const url = new URL(req.url);
        const pathname = url.pathname;
        // const body = await req.json();
        // const text = await req.text();
        // const method = req.method;
        
        const match = Array.from(routerMap.entries()).find((v) => {
            console.log(v[0], pathname)
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
                meta: {}
            };

            console.log(reqObj);

            const pagefile = await import(join(cwd, 'pages', routeInfo.raw));
            
            const Page = pagefile.handler(reqObj);

            const pageOut = renderSSR(<Page />);
            return new Response(pageOut);
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
            statusText: error.name
        });
    }
})

function convertSearchParams(searchParams: URLSearchParams) {
  const obj = {};
  for (const p of searchParams) {
    const key = p[0];
    let value: any = p[1];
    if (value === "") value = "";
    if (value === "true") value = true;
    if (value === "false") value = false;
    else {
        try { value = parseInt(value); } catch (_) {
            try { value = parseFloat(value); } catch (_) { /* Do nothing */}
        }
    }
    Object.defineProperty(obj, key, { value, writable: false });
  }

  return obj;
}
