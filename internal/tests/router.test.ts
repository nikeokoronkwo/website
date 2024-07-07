import { assert } from "jsr:@std/assert/assert";
import { assertEquals } from "jsr:@std/assert/assert-equals";
import { assertExists } from "jsr:@std/assert/assert-exists";
import { assertThrows } from "jsr:@std/assert/assert-throws";

// test
import { resolvePath } from "../lib/router.ts"

Deno.test({
    name: "Testing the route generator"
}, async (t) => {

    await t.step("Testing edge case routes", (st) => {
        assertThrows(() => resolvePath(""));
        assertThrows(() => resolvePath("."));

        assert(resolvePath(".ts") === undefined);
        assert(resolvePath("foo/bar/.tsx") === undefined);
    });

    await t.step("Testing basic files", (st) => {
        assertEquals(resolvePath("index.ts"), "/");
        assertEquals(resolvePath("index.js"), "/");
        assertEquals(resolvePath("main.ts"), "/main");
        assertEquals(resolvePath("love.jsx"), "/love");

        assertEquals(resolvePath("foo/bar.ts"), "/foo/bar");
        assertEquals(resolvePath("foo/bar/qux.tsx"), "/foo/bar/qux");
    })

    await t.step("Testing name handling", (st) => {
        assertEquals(resolvePath("love-kills.js"), '/love-kills');
        assertEquals(resolvePath("love_kills.tsx"), '/love_kills');
        
    })

    await t.step("Testing Parametrized", (st) => {
        assertEquals(resolvePath("[foo]/bar.ts"), "/*/bar");
        assertEquals(resolvePath("foo/[bar]/qux.tsx"), "/foo/*/qux");

        assertEquals(resolvePath("foo/[...qux].ts"), "/foo/**");
    })
});