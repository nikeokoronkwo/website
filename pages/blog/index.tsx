import { definePage } from "#client";
import { walkSync } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path/join";
import { Layout } from "#components";

import { matter } from "https://esm.sh/vfile-matter";
import { readSync } from "https://esm.sh/to-vfile";
import { extname } from "jsr:@std/path@1.0.1/extname";

/**
 * @todo Pass the blog directory as prop for this component,
 *
 * @todo Perform similar action for all components making use of the content directory to allow less nesting of folders for prod server
 */
const blogDir = join("content", "blog");

function getBlogData() {
  const output = [];
  for (
    const file of walkSync(blogDir, {
      maxDepth: 1,
      includeDirs: false,
      includeSymlinks: false,
    })
  ) {
    const fullPath = join(Deno.cwd(), file.path);
    const fileInfo = Deno.statSync(fullPath);

    const f = readSync(fullPath);

    matter(f, { strip: true });

    output.push({
      name: file.name,
      matter: f.data.matter,
      created: f.data.matter.date
        ? new Date(f.data.matter.date)
        : fileInfo.birthtime,
      edited: f.data.matter.date
        ? new Date(f.data.matter.date)
        : fileInfo.mtime,
    });
  }

  return output;
}

export default definePage({
  handler: (_req) => (
    <Layout>
      <div className="px-10 py-5 flex flex-col justify-center">
        <div className="flex flex-col min-h-[30vh] justify-center items-start border-b-2 border-b-primary-950 space-y-3">
          <div className="text-3xl font-bold">Blog</div>
          <div className="flex flex-col">
            <p className="m-0">
                Just a basic blog of myself, almost like any other blog you'd see out there I guess..
            </p>
          </div>
        </div>
        <div className="flex flex-col max-w-screen-md pt-5">
          {getBlogData().map((m) => (
            <div className="px-5 flex flex-row justify-between py-5 border rounded-lg border-primary-900 overflow-hidden shadow-sm max-h-80">
              <div className="flex flex-col space-y-2 justify-evenly max-w-lg">
                {/* Name */}
                <div className="font-bold text-2xl mb-1">
                  {m.matter.title ?? m.name}
                </div>
                {/* Date */}
                <div className="text-gray-500 text-sm">
                  {m.created
                    ? <div>Created {m.created.toDateString()}</div>
                    : <></>}
                  {m.edited
                    ? <div>Edited {m.edited.toDateString()}</div>
                    : <></>}
                </div>
                {/* Description */}
                <div className="text-ellipsis overflow-hidden">
                  {m.matter.description ?? (
                    <div className="italic text-gray-800">
                      No Description Available
                    </div>
                  )}
                </div>
              </div>

              {/* Read More */}
              <div className="justify-end flex flex-col items-end">
                <a href={`/blog/${(m.name).replace(extname(m.name), "")}`}>
                   <button className="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg">
                    Read
                  </button> 
                </a>
                  
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  ),
  pageMeta: {
    title: "Blog | Nike Okoronkwo",
    head: {
      meta: [{
        name: "description", 
        content: "The personal blog of Nike Okoronkwo"
      }]
    }
  }
});
