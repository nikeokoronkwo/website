import { defineConfig } from "./internal/exports/module.ts";

export default defineConfig({
  app: {
    title: "Nike Okoronkwo",
  },
  seo: {
    description: "The personal homepage of Nikechukwu Okoronkwo.",
  },
  build: {
    singleBundle: false,
    minify: true,
  },
  server: {
    host: "localhost",
  },
});
