// deno-lint-ignore-file no-explicit-any
export interface ServerProdOptions {
  pages: {
    main: string;
    error: string;
  };
  ejs?: {
    [k: string]: string;
  };
  mdx?: {
    [k: string]: string;
  };
  renderedPages?: Record<string, any>;
  /** The output directory */
  outDir: string;
  tailwind: string;
}
