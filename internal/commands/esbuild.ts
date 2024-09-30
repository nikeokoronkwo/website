import { join } from "../deps.ts";
import { esbuild } from "../esbuild.ts";

await esbuild.build({
    entryPoints: [join(Deno.cwd(), "internal", "commands", "a.js")],
    outdir: join(Deno.cwd(), "internal", "commands", "a")
})

