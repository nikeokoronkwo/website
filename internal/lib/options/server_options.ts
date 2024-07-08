export interface ServerProdOptions {
  pages: {
    main: string;
    error: string;
  };
  ejs: {
    [k: string]: string;
  };
  mdx: {
    [k: string]: string;
  };
}
