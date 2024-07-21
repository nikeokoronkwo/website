import { assertEquals } from "jsr:@std/assert/equals";

import { format } from "npm:prettier";
import * as ejs from "npm:ejs";

async function assertMLSEquals(actual, expected, parser, msg) {
  parser ??= "html";
  return assertEquals(
    await format(actual, { parser }),
    await format(expected, { parser }),
    msg,
  );
}

Deno.test({
  name: "Testing Main EJS Template",
}, async (t) => {
  const fileContent = Deno.readTextFileSync("./internal/templates/main.ejs");

  await t.step("Basic usage", async () => {
    await assertMLSEquals(
      ejs.render(fileContent, {
        title: "",
        meta: [],
        link: [],
        style: [],
        script: [],
        noscript: [],
        bodyAttrs: [],
        bodyScript: [],
        body: "",
        tailwind: "/output.css"
      }),
      `<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    
    <link href="/output.css" rel="stylesheet">
</head>
<body>
  <div id="__app"></div>
</body>
</html>`,
    );
  });
});
