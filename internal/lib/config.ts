import { AppEntryOptions } from "../types/templates.ts";

export interface NikeConfig {
  app?: AppEntryOptions;
  server?: {
    host?: string;
    port?: number;
  };
  publicDir?: string;
  build?: {
    singleBundle?: boolean;
    minify?: boolean;
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
      },
    },
    server: {
      port: 3000,
      host: "localhost",
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
