import { definePage } from "#client";
import { extname } from "jsr:@std/path/extname";
import { walkSync } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path/join";
import { Layout } from "~/components/index.tsx";

import { matter } from "https://esm.sh/vfile-matter";
import { read, readSync } from "https://esm.sh/to-vfile";

/**
 * @todo Pass the blog directory as prop for this component,
 * 
 * @todo Perform similar action for all components making use of the content directory to allow less nesting of folders for prod server
 */
const blogDir = join("content", "blog");

function getBlogData() {
    const output = [];
    for (const file of walkSync(blogDir, { maxDepth: 1, includeDirs: false, includeSymlinks: false })) {
        const f = readSync(file.path);
        
        matter(f, { strip: true });

        output.push({
            name: file.name,
            matter: f.data.matter,
        });
    }

    return output;
}

export default definePage({
    handler: (req) => (
        <Layout>
            <div className="px-10 py-5 flex flex-col justify-center">
                <div className="flex flex-col min-h-[50vh] justify-center items-start border-b-2 border-b-primary-950">
                    <div className="text-3xl font-bold">Blog</div>
                </div>
                <div className="flex flex-col max-w-screen-md">
                    {getBlogData()}
                </div>
            </div>
        </Layout>
    )
})