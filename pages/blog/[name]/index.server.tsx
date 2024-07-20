import { defineRoute } from "#client";
import { existsSync } from "jsr:@std/fs/exists";
import { join } from "jsr:@std/path/join";
import { createError } from "~/internal/lib/errors.ts";
import { CSS, render } from "jsr:@deno/gfm";

import { matter } from "https://esm.sh/vfile-matter";
import { read, readSync } from "https://esm.sh/to-vfile";
import { compile } from "https://esm.sh/@mdx-js/mdx";
import remarkedGfm from "https://esm.sh/remark-gfm";
import remarkFrontmatter from "https://esm.sh/remark-frontmatter";
import remarkMdxFrontmatter from "https://esm.sh/remark-mdx-frontmatter@^4";
import { renderSSR } from "https://deno.land/x/nano_jsx@v0.1.0/ssr.ts";

const html = (body: string, meta: any) => `

`;

// future will support ".adoc"
const extensions = [".md", ".mdx"] as const;
type Extension = typeof extensions[number];

const contentDir = "content";

export default defineRoute(async (req) => {
    // supported extensions are .md and .mdx
    const fileExt: Extension | undefined = extensions.find(e => existsSync(join(contentDir, "blog", `${req.params.name}${e}`)));

    if (!fileExt) throw createError({
        statusCode: 405,
        name: "Not Found Error",
        message: "The blog post at the given route cannot be found. It may have been deleted, or there may be an error with the URL"
    });

    const filePath = join(contentDir, "blog", `${req.params.name}${fileExt}`);

    const file = await read(filePath);
    // console.log(file, filePath, fileExt);
    matter(file, {});

    let src: string;
    let metadata = file.data.matter;

    switch (fileExt) {
        case ".md":
            src = render(String(file));
            // if .md render with deno gfm
            break;
        case ".mdx":
            {
                // if .mdx render with mdx and serve as component
                const mdx = await compile(file, {
                    remarkPlugins: [remarkedGfm, remarkFrontmatter, remarkMdxFrontmatter],
                    jsxImportSource: "nano_jsx"
                });

                const mdxFile = (await import(`data:text/javascript, ${mdx}`));
                metadata = mdxFile.frontmatter;

                const Component = mdxFile.default;
                // nano jsx render
                src = renderSSR(() => (<Component />));
            }
            break;
        default:
            src = "Content not found"
            break;
    }

    // apply github css

    // serve
    return new Response(src, {
        headers: {
          "content-type": "text/html",
        },
      });
})