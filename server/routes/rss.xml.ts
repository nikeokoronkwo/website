import { serverQueryContent } from "#content/server";

import RSS from "rss";

const url = process.env.NODE_ENV
  ? "http://localhost:3000"
  : "https://nikechukwu.deno.dev";

export default defineEventHandler(async (event) => {
  try {
    const blogPosts = await serverQueryContent(event)
      .sort({ date: -1 })
      .where({ _partial: false })
      .find();

    const feed = new RSS({
      title: "Nike Okoronkwo",
      site_url: url,
      feed_url: `${url}/rss.xml`,
    });

    for (const doc of blogPosts.filter((b) => b._path?.startsWith("/blog"))) {
      feed.item({
        title: doc.title ?? "-",
        url: `${url}${doc._path}`,
        date: new Date(doc.date),
        description: doc.description,
      });
    }

    const feedString = feed.xml({ indent: true });

    setHeader(event, "content-type", "text/xml");
    return feedString;
  } catch (e) {
    throw createError({
      status: 410,
      message: `Site error: ${(e as Error).name}`,
      statusMessage: (e as Error).message,
    });
  }
});
