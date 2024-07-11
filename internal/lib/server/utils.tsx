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
        return await renderDevServerPage(options.cwd, options.routeInfo,  options.req);
    } else {
        return await renderProdServerPage(options.routeInfo, options.options, options.req);
    }
}

export async function renderClientPage(options: DevClientPageOptions | ProdClientPageOptions) {
    if ("cwd" in options) {
        return await renderDevClientPage(options.cwd, options.routeInfo, options.reqObj, options.config);
    } else {
        return await renderProdClientPage(options.routeInfo, options.options, options.reqObj, options.config);
    }
}

async function renderDevServerPage(cwd: string, routeInfo: RouteInfo, req: Request): Promise<Response> {
    return await import(
      toFileUrl(join(cwd, "pages", routeInfo.raw)).href
    )
      .then((pagefile) => {
        return pagefile.default(req);
      });
}

async function renderProdServerPage(routeInfo: RouteInfo, options: ServerProdOptions, req: Request): Promise<Response> {
    return await import(
      isAbsolute(routeInfo.fullPath)
        ? relative(
          options.outDir,
          toFileUrl(routeInfo.fullPath).href
        )
        : routeInfo.fullPath
    )
      .then((pagefile) => {
        return pagefile.default(req);
      });
}

async function renderDevClientPage(cwd: string, routeInfo: RouteInfo, reqObj: { path: string; hash: string; params: { [k: string]: string | string[]; }; query: Record<string, any>; fullPath: string; }, config: NikeConfig) {
    const response = import(
      toFileUrl(join(cwd, "pages", routeInfo.raw)).href
    )
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
      tailwind: "./output.css"
    };
  
    const newResponse = ejsRender(
      await Deno.readTextFile("./internal/templates/main.ejs"),
      mainTemplateOptions
    );
    return new Response(newResponse, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  async function renderProdClientPage(routeInfo: RouteInfo, options: ServerProdOptions, reqObj: { path: string; hash: string; params: { [k: string]: string | string[]; }; query: Record<string, any>; fullPath: string; }, config: NikeConfig) {
    const response = import(
      isAbsolute(routeInfo.fullPath)
        ? relative(
          options.outDir,
          toFileUrl(routeInfo.fullPath).href
        )
        : routeInfo.fullPath
    )
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
      tailwind: join(options.outDir, "client", options.tailwind)
    };
  
    const newResponse = ejsRender(
      options.pages.main,
      mainTemplateOptions
    );
    return new Response(newResponse, {
      headers: {
        "content-type": "text/html",
      },
    });
  }