import { bot } from "../bot.ts"

bot.command("start",async (ctx) => {
    await ctx.reply("A'zolik qo'shildi.")
})
