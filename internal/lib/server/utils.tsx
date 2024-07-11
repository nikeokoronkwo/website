// deno-lint-ignore-file no-explicit-any
import { toFileUrl } from "jsr:@std/path/to-file-url";
import { RouteInfo, getRouterParams } from "../router.ts";
import { ServerProdOptions } from "./options.ts";
import { join } from "jsr:@std/path/join";
import { isAbsolute } from "jsr:@std/path/is-absolute";
import { relative } from "jsr:@std/path/relative";
import { NikeConfig } from "../config.ts";
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";
import { h } from "https://deno.land/x/nano_jsx@v0.1.0/core.ts";
import { MainTemplate } from "../../types/ejs.ts";
// @deno-types="npm:@types/ejs"
import { render as ejsRender } from "npm:ejs";
import { InternalError } from "../errors.ts";

interface ServerPageOptions {
    routeInfo: RouteInfo;
    req: Request;
}

interface DevServerPageOptions extends ServerPageOptions {
    cwd: string;
}

interface ProdServerPageOptions extends ServerPageOptions {
    options: ServerProdOptions;
}

interface ClientPageOptions {
    routeInfo: RouteInfo;
    config: NikeConfig;
    reqObj: { path: string; hash: string; params: { [k: string]: string | string[]; }; query: Record<string, any>; fullPath: string; };
}

interface DevClientPageOptions extends ClientPageOptions {
    cwd: string;
}

interface ProdClientPageOptions extends ClientPageOptions {
    options: ServerProdOptions;
}

export async function renderServerPage(options: DevServerPageOptions | ProdServerPageOptions) {
    if ("cwd" in options) {
        return await renderServerPageFunc(toFileUrl(join(options.cwd, "pages", options.routeInfo.raw)).href, options.req);
    } else {
        return await renderServerPageFunc(isAbsolute(options.routeInfo.fullPath)
        ? relative(
          options.options.outDir,
          toFileUrl(options.routeInfo.fullPath).href
        )
        : options.routeInfo.fullPath, options.req);
    }
}

export async function renderClientPage(options: DevClientPageOptions | ProdClientPageOptions) {
    if ("cwd" in options) {
        return await renderClientPageFunc(toFileUrl(join(options.cwd, "pages", options.routeInfo.raw)).href, options.reqObj, options.config, "./output.css", await Deno.readTextFile("./internal/templates/main.ejs"));
    } else {
        return await renderClientPageFunc(isAbsolute(options.routeInfo.fullPath)
        ? relative(
          options.options.outDir,
          toFileUrl(options.routeInfo.fullPath).href
        )
        : options.routeInfo.fullPath, options.reqObj, options.config, join(options.options.outDir, "client", options.options.tailwind), options.options.pages.main);
    }
}

async function renderServerPageFunc(path: string, req: Request): Promise<Response> {
    return await import(path)
      .then((pagefile) => {
        return pagefile.default(req);
      });
}

  async function renderClientPageFunc(path: string, reqObj: { path: string; hash: string; params: { [k: string]: string | string[]; }; query: Record<string, any>; fullPath: string; }, config: NikeConfig, tailwindPath: string, ejsPath: string) {
    const response = import(path)
      .then((pagefile) => {
        const Page = pagefile.default.handler;
  
        const pageOut = renderSSR(() => <Page {...reqObj} />);
  
        return pageOut;
      });
  
    const mainTemplateOptions: MainTemplate = {
      title: config.app?.title ?? "My App",
      meta: config.app?.head?.meta ?? [],
      link: config.app?.head?.link ?? [],
      style: config.app?.head?.style ?? [],
      script: config.app?.head?.script ?? [],
      noscript: config.app?.head?.noscript ?? [],
      bodyAttrs: config.app?.bodyAttrs ?? {},
      bodyScript: config.app?.script ?? [],
      body: await response,
      tailwind: tailwindPath
    };
  
    const newResponse = ejsRender(
      ejsPath,
      mainTemplateOptions
    );
    return new Response(newResponse, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  export function convertSearchParams(searchParams: URLSearchParams) {
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
  
export function errorHandler(): ((error: unknown) => Response | Promise<Response>) | undefined {
    return (err) => {
      const sysError = err instanceof InternalError;
      const error = sysError ? err as InternalError : new InternalError({
        statusCode: 500,
        name: "Unknown Error",
        message: "An unknown error occured"
      });
  
      return new Response(error.message, {
        status: error.statusCode,
        statusText: error.name,
      });
    };
  }
  