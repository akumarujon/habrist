import { bot } from "../bot.ts";
import { getUsers } from "../kv.ts";

bot.command("users", async (ctx) => {
    await ctx.reply(`${await getUsers()}`)
})