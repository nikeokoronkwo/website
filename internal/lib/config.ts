import { AppEntryOptions } from "../types/templates.ts";

export interface NikeConfig {
  app?: AppEntryOptions;
  seo?: {
    description?: string;
  };
  server?: {
    host?: string;
    port?: number;
  };
  publicDir?: string;
  build?: {
    singleBundle?: boolean;
    minify?: boolean;
  };
  tailwind?: {
    path: string;
  };
}

export function defaultConfig(): NikeConfig {
  return {
    app: {
      title: "My App",
      head: {
        meta: [
          {
            charset: "UTF-8",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ],
        link: [
          // <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
          // <link rel="icon" type="image/png" href="/assets/images/favicon.png">
          {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/favicon.png",
          },
          {
            rel: "apple-touch-icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          },
          {
            rel: "apple-touch-icon",
            type: "image/png",
            href: "/favicon.png",
          },
        ],
      },
    },
    server: {
      port: 3000,
      host: "localhost",
    },
    tailwind: {
      path: "./styles/tailwind.css",
    },
  };
}

export function mergeConfig(
  configA: NikeConfig,
  configB: NikeConfig,
  precedence: "a" | "b" = "a",
) {
  const aPred = precedence === "a";
  return aPred ? { ...configB, ...configA } : { ...configA, ...configB };
}

export function defineConfig(options: NikeConfig) {
  return options;
}
