/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />
import { defineRoute } from "#client";
import { existsSync } from "jsr:@std/fs/exists";
import { join } from "jsr:@std/path/join";
import { createError } from "#client";

import { matter } from "https://esm.sh/vfile-matter";
import { readSync } from "https://esm.sh/to-vfile";
import { compile } from "https://esm.sh/@mdx-js/mdx";
import remarkedGfm from "https://esm.sh/remark-gfm";
import remarkFrontmatter from "https://esm.sh/remark-frontmatter";
import remarkMdxFrontmatter from "https://esm.sh/remark-mdx-frontmatter@^4";
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";
// @deno-types="npm:@types/dompurify"
import DOMPurify from "npm:dompurify";

const _primer =
  "https://cdnjs.cloudflare.com/ajax/libs/Primer/21.1.1/primer.css";
const gmin =
  "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.6.1/github-markdown.min.css";

/** @todo make server routes easier to deal with when incorporating things like styles */
// deno-lint-ignore no-explicit-any
const html = (body: string, meta: any, tailwind?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${meta.description}">
    <link rel="stylesheet" href="${gmin}">
    <style>${""}</style>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+BR:wght@100..400&display=swap');

        .highlight-font {
            font-family: "Playwrite BR", cursive;
            font-optical-sizing: auto;
            font-style: normal;
        }
    </style>
    ${
  tailwind
    ? `<link href="${tailwind}" rel="stylesheet">`
    : `<script src="https://cdn.twind.style" crossorigin></script>`
}
    ${
  tailwind ? "" : `<script>
        twind.install({
            presets: [
                {
                    theme: {
                        fontFamily: {
                            serif: ["Times", "serif"],
                        },
                    },
                },
            ],
        });
    </script>`
}
    <title>${meta.title} | Nike's Blog </title>
</head>
<body>
    <div id="__app" class="px-5 h-full">
        <div class="sticky top-0 h-16 w-[96vw] flex flex-row justify-between items-center self-start space-x-10 mx-auto">
            <a href="/">
                <div class="highlight-font text-xl -ml-[0.625rem]">nikechukwu</div>
            </a>
        </div>
        <div class="flex flex-col justify-center items-center px-2">
            <div class="pt-5 pb-10 justify-center items-center">
                <div class="text-4xl font-bold">${
  meta.title ?? "My Title"
}</div>
                <div class="text-gray-700 text-base font-normal">${
  meta.description ?? "My Description"
}</div>
            </div>
            <main data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body px-8 pt-7">
                ${body}
            </main>
        </div>
        <div>
            <footer class="flex flex-col absolute bottom-0">
                <div class="flex flex-row justify-between items-cente py-5">
                  <small class="flex flex-col text-gray-700">
                    <span>(C) Nikechukwu Okoronkwo 2024</span>
                    <span>All Rights Reserved.</span>
                  </small>
                </div>
            </footer>
        </div>
    </div>
</body>
</html>
`;

// future will support ".adoc"
const extensions = [".md", ".mdx"] as const;
type Extension = typeof extensions[number];

const contentDir = "content";

export default defineRoute(async (req) => {
  try {
    // supported extensions are .md and .mdx
    const fileExt: Extension | undefined = extensions.find((e) =>
      existsSync(join(contentDir, "blog", `${req.params.name}${e}`))
    );

    if (!fileExt) {
      throw createError({
        statusCode: 405,
        name: "Not Found Error",
        message:
          "The blog post at the given route cannot be found. It may have been deleted, or there may be an error with the URL",
      });
    }

    const filePath = join(
      Deno.cwd(),
      contentDir,
      "blog",
      `${req.params.name}${fileExt}`,
    );

    const file = readSync(filePath);

    let src: string = "foo";
    let metadata;

    switch (fileExt) {
      case ".md":
        {
          matter(file, {});

          metadata = file.data.matter;

          const mdx = await compile(file, {
            remarkPlugins: [
              remarkedGfm,
              remarkFrontmatter,
              remarkMdxFrontmatter,
            ],
            jsxImportSource: "nano_jsx",
          });

          const mdxFile = await import(`data:text/javascript, ${mdx}`);
          metadata = mdxFile.frontmatter;

          const Component = mdxFile.default;
          // nano jsx render
          src = DOMPurify.sanitize(renderSSR(() => <Component />));
        }

        break;
      case ".mdx":
        {
          matter(file, {});

          // metadata = file.data.matter;

          // if .mdx render with mdx and serve as component
          const mdx = await compile(file, {
            remarkPlugins: [
              remarkedGfm,
              remarkFrontmatter,
              remarkMdxFrontmatter,
            ],
            jsxImportSource: "nano_jsx",
          });

          const mdxFile = await import(`data:text/javascript, ${mdx}`);
          metadata = mdxFile.frontmatter;

          const Component = mdxFile.default;
          // nano jsx render
          src = DOMPurify.sanitize(renderSSR(() => <Component />));
        }
        break;
      default:
        src = "Content not found";
        break;
    }

    // apply github css
    const resp = html(src, metadata);

    // serve
    return new Response(resp, {
      headers: {
        "content-type": "text/html",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
});
