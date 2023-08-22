import { Bot } from "./deps.ts";
import "https://deno.land/x/dot_env@v0.1.0/load.ts";

const TOKEN = Deno.env.get('TOKEN')
const bot = new Bot(TOKEN);
bot.command("start",async (ctx) => {
    await ctx.reply("A'zolik qo'shildi.")
})

import { serve, webhookCallback } from "./deps.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve(async (req) => {
  if (req.method == "POST") {
    try {
      return await handleUpdate(req);
    } catch (err) {
      console.error(err);
      return new Response();
    }
  }

  return Response.redirect("https://t.me/habrist_bot", 302);
});