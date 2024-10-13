import { Kv } from "@deno/kv";

export default defineEventHandler(async (event) => {
    // collect params
    const post = getRouterParam(event, 'post') ?? '';
    const ip = getRequestHeaders(event)['x-forwarded-for'] || event.node.req.socket.remoteAddress || '';

    const kv: Kv = await useKv();

    const visitorKey = ["visitor", ip]; // Use the IP address as the key
    const uniqueCountKey = [post, 'views'];

    const res = await kv.atomic()
    .check({ key: visitorKey, versionstamp: null })
    .set(visitorKey, { timestamp: Date.now() })
    .set(uniqueCountKey, ((await kv.get<number>(uniqueCountKey)).value || 0) + 1)
    .commit();

    if (!res.ok) {
        throw createError({
            status: 410,
            message: "Shit didn't work so well"
        })
    }
})