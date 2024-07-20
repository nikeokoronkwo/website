import { definePage } from "#client";
import { extname } from "jsr:@std/path/extname";
import { walkSync } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path/join";

const blogDir = join("content", "blog");

function getBlogData() {
    const output = [];
    for (const file of walkSync(blogDir, { maxDepth: 1, includeDirs: false, includeSymlinks: false })) {
        switch (extname(file.path)) {
            case ".md":
                break;
            case ".mdx":
                break;
            default:
                break;
        }
    }

    return output;
}

export default definePage({
    handler: (req) => (
        <div>
            <div>Blog</div>
        </div>
    )
})