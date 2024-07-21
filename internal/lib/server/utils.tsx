// deno-lint-ignore-file no-explicit-any
import { toFileUrl } from "jsr:@std/path/to-file-url";
import { RouteInfo } from "../router.ts";
import { ServerProdOptions } from "./options.ts";
import { join } from "jsr:@std/path/join";
import { isAbsolute } from "jsr:@std/path/is-absolute";
import { relative } from "jsr:@std/path/relative";
import { NikeConfig } from "../config.ts";
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";
import { withStyles } from "https://deno.land/x/nano_jsx@v0.1.0/withStyles.ts";
import { MainTemplate } from "../../types/ejs.ts";
// @deno-types="npm:@types/ejs"
import { render as ejsRender } from "npm:ejs";
import { BaseError, InternalError } from "../errors.ts";
import { ClientModule, ServerModule } from "../../types/pages.ts";
import { ClientRequest } from "../../lib/client.ts";
import { APIRequest } from "../../lib/api.ts";
import { AppEntryOptions } from "~/internal/types/templates.ts";

const pageCss = `
body {
  width: 100%;
  height: 100%;
}
`;

interface ServerPageOptions {
  routeInfo: RouteInfo;
  reqObj: APIRequest;
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
  reqObj: ClientRequest;
}

interface DevClientPageOptions extends ClientPageOptions {
  cwd: string;
}

interface ProdClientPageOptions extends ClientPageOptions {
  options: ServerProdOptions;
}

export async function renderServerPage(
  options: DevServerPageOptions | ProdServerPageOptions,
) {
  let path;
  const reqObj = options.reqObj;
  if ("cwd" in options) {
    path = toFileUrl(join(options.cwd, "pages", options.routeInfo.raw)).href;
  } else {
    // production
    path = isAbsolute(options.routeInfo.fullPath)
      ? relative(
        options.options.outDir,
        toFileUrl(options.routeInfo.fullPath).href,
      )
      : options.routeInfo.fullPath;
  }

  const resp = import(path)
    .then(async (pagefile: ServerModule) => {
      return await Promise.resolve(pagefile.default(reqObj));
    });

  return await resp;
}

export async function renderClientPage(
  options: DevClientPageOptions | ProdClientPageOptions,
) {
  if ("cwd" in options) {
    // development
    return await renderClientPageFunc(
      toFileUrl(join(options.cwd, "pages", options.routeInfo.raw)).href,
      options.reqObj,
      options.config,
      "/output.css",
      await Deno.readTextFile("./internal/templates/main.ejs"),
    );
  } else {
    // production
    return await renderClientPageFunc(
      isAbsolute(options.routeInfo.fullPath)
        ? relative(
          options.options.outDir,
          toFileUrl(options.routeInfo.fullPath).href,
        )
        : options.routeInfo.fullPath,
      options.reqObj,
      options.config,
      join(options.options.outDir, options.options.tailwind),
      options.options.pages.main,
    );
  }
}

async function renderClientPageFunc(
  path: string,
  reqObj: {
    path: string;
    hash: string;
    params: { [k: string]: string | string[] };
    query: Record<string, any>;
    fullPath: string;
  },
  config: NikeConfig,
  tailwindPath: string,
  ejs: string,
) {
  let pageMeta: AppEntryOptions | undefined = config.app;
  const response = await import(path)
    .then((pagefile: ClientModule) => {
      const Page = pagefile.default.handler;
      pageMeta = mergeMeta(pagefile.default.pageMeta ?? {}, pageMeta);
      const styles = (pagefile.default.overrideGlobal ? "" : pageCss) +
        (pagefile.default.style ?? "");

      const pageOut = renderSSR(() => withStyles(styles)(<Page {...reqObj} />));
      return pageOut;
    });

  const meta = pageMeta?.head?.meta ?? [];
  if (
    config.seo?.description && !(meta.find((m) => m.name === "description"))
  ) {
    meta.push({
      name: "description",
      content: config.seo.description,
    });
  }

  const mainTemplateOptions: MainTemplate = {
    title: pageMeta?.title ?? "My App",
    meta,
    link: pageMeta?.head?.link ?? [],
    style: pageMeta?.head?.style ?? [],
    script: pageMeta?.head?.script ?? [],
    noscript: pageMeta?.head?.noscript ?? [],
    bodyAttrs: pageMeta?.bodyAttrs ?? {},
    bodyScript: pageMeta?.script ?? [],
    body: response,
    tailwind: tailwindPath,
  };

  const newResponse = ejsRender(
    ejs,
    mainTemplateOptions,
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

export function errorHandler(ejs: string):
  | ((error: unknown) => Response | Promise<Response>)
  | undefined {
  return (err) => {
    const sysError = err instanceof BaseError;
    const error = sysError ? err as BaseError : new InternalError({
      statusCode: 500,
      name: "Unknown Error",
      message: "An unknown error occured",
    });

    const resp = ejsRender(ejs, {
      error,
    });

    return new Response(resp, {
      status: error.statusCode,
      statusText: error.name,
      headers: {
        "content-type": "text/html",
      },
    });
  };
}

/**
 * A takes precedence over B
 */
function mergeMeta(a: AppEntryOptions, b?: AppEntryOptions): AppEntryOptions {
  return {
    title: a?.title ?? b?.title,
    head: {
      meta: mergeRecords(a.head?.meta ?? [], b?.head?.meta ?? [], ["name"]),
      link: mergeRecords(a.head?.link ?? [], b?.head?.link ?? [], [
        "rel",
        "href",
      ]),
      style: mergeRecords(a.head?.style ?? [], b?.head?.style ?? [], [
        "src",
        "children",
      ]),
      script: mergeRecords(a.head?.script ?? [], b?.head?.script ?? [], [
        "src",
        "children",
      ]),
      noscript: mergeRecords(a.head?.noscript ?? [], b?.head?.noscript ?? [], [
        "children",
      ]),
    },
    bodyAttrs: { ...a.bodyAttrs, ...b?.bodyAttrs },
    script: mergeRecords(a.script ?? [], b?.script ?? [], ["src", "children"]),
  };
}

function mergeRecords<T extends keyof any, U>(
  a: Record<T, U>[],
  b: Record<T, U>[],
  keys: T[],
): Record<T, U>[] {
  const base = [...a];
  const seen = new Set<string>();

  const generateKey = (item: Record<T, U>) =>
    keys.map((key) => item[key]).join("|");

  // Populate the set with existing items in 'a'
  for (const item of a) {
    seen.add(generateKey(item));
  }

  // Add items from 'b' that are not in 'a'
  for (const item of b) {
    const itemKey = generateKey(item);
    if (!seen.has(itemKey)) {
      seen.add(itemKey);
      base.push(item);
    }
  }

  return base;
}
