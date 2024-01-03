import { bot } from "../bot.ts"
import { append, getAll } from "../kv.ts"
import { getFeed } from "../feed.ts"

bot.command("start",async (ctx) => {
    const users = await getAll()
    if(!users.includes(`${ctx.message?.chat.id}`))
    append(`${ctx.message?.chat.id}`)
    await ctx.reply("A'zolik qo'shildi.")
})

const kv = await Deno.openKv()

Deno.cron("send an article", "* * * * *", async() => {
    const users = (await kv.get<string[]>(["users"])).value as string[]
    for(const user of users) {
        const feed = await getFeed()
        await bot.api.sendMessage(user, feed)
    }
})
