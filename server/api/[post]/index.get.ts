import { Kv } from "@deno/kv";

export default defineEventHandler(async (event) => {
  // collect params
  const post = getRouterParam(event, "post") ?? "";

  const kv: Kv = await useKv();

  // get info
  const data = await kv.get<number>([post, "views"]);
  return {
    views: data.value,
  };
});
