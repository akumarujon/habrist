import { bot } from "../bot.ts";
import { getAll } from "../kv.ts";

bot.command("users", async (ctx) => {
  await ctx.reply(`${[...new Set(await getAll())]}`);
});
