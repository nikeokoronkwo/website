import {

} from "https://deno.land/x/nano_jsx@v0.1.0/mod.ts";
import { extname } from "jsr:@std/path/extname";
import { exists } from "jsr:@std/fs/exists";
import { walk } from "jsr:@std/fs/walk";
import { InternalError } from "../internal/lib/errors.ts";
import { join } from "jsr:@std/path/join";

const cwd = Deno.cwd();
const publicPath = "./public";

Deno.serve({
    handler: async (req) => {
        const url = new URL(req.url);
        const pathname = url.pathname; 
        const body = await req.json();
        const text = await req.text();
        const method = req.method;
        
        if (Deno.readDirSync(join(Deno.cwd()))) { /** client routes */ }
        else if (await exists(join(Deno.cwd(), 'pages'))) { /** */ }
        
        const reqObj = {
            path: pathname,
            hash: url.hash,
            query: convertSearchParams(url.searchParams),
            fullPath: pathname + url.search + url.hash,
            meta: req.json()
        };

        
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
