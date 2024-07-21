import { assert } from "jsr:@std/assert/assert";
import { assertEquals } from "jsr:@std/assert/assert-equals";
import { assertThrows } from "jsr:@std/assert/assert-throws";

// test
import { getRouterParams, resolvePath } from "../lib/router.ts";

Deno.test({
  name: "Testing the route generator",
}, async (t) => {
  await t.step("Testing edge case routes", () => {
    assertThrows(() => resolvePath(""));
    assertThrows(() => resolvePath("."));

    assert(resolvePath(".ts") === undefined);
    assert(resolvePath("foo/bar/.tsx") === undefined);
  });

  await t.step("Testing basic files", () => {
    assertEquals(resolvePath("index.ts"), "/");
    assertEquals(resolvePath("index.js"), "/");
    assertEquals(resolvePath("main.ts"), "/main");
    assertEquals(resolvePath("love.jsx"), "/love");

    assertEquals(resolvePath("foo/bar.ts"), "/foo/bar");
    assertEquals(resolvePath("foo/bar/qux.tsx"), "/foo/bar/qux");
  });

  await t.step("Testing name handling", () => {
    assertEquals(resolvePath("love-kills.js"), "/love-kills");
    assertEquals(resolvePath("love_kills.tsx"), "/love_kills");
  });

  await t.step("Testing Parametrized", () => {
    assertEquals(resolvePath("[foo]/bar.ts"), "/*/bar");
    assertEquals(resolvePath("foo/[bar]/qux.tsx"), "/foo/*/qux");

    assertEquals(resolvePath("foo/[...qux].ts"), "/foo/**");
  });
});

Deno.test({
  name: "Testing the route tester",
}, async (t) => {
  await t.step("Basic cases", () => {
    assertEquals(
      getRouterParams(
        resolvePath("foo/[qux].ts") ?? "",
        "foo/[qux].ts",
        "/foo/feee",
      ),
      {
        "qux": "feee",
      },
    );
    assertEquals(
      getRouterParams(
        resolvePath("foo/[bar]/qux.ts") ?? "",
        "foo/[bar]/qux.ts",
        "/foo/mdx/qux",
      ),
      {
        "bar": "mdx",
      },
    );
    assertEquals(
      getRouterParams(
        resolvePath("a/[b]/c/[d].ts") ?? "",
        "a/[b]/c/[d].ts",
        "/a/bb/c/dddd",
      ),
      {
        "b": "bb",
        "d": "dddd",
      },
    );
  });

  await t.step("Catch-All Cases", () => {
    assertEquals(
      getRouterParams(
        resolvePath("foo/[...bar].ts") ?? "",
        "foo/[...bar].ts",
        "/foo/mdx/qux",
      ),
      {
        "bar": ["mdx", "qux"],
      },
    );
  });
});
