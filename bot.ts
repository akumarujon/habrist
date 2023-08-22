import { Bot } from "./deps.ts";
import "https://deno.land/x/dot_env@v0.1.0/load.ts";
import { launch } from "./serve.ts"

const TOKEN = Deno.env.get('TOKEN')
const bot = new Bot(TOKEN);

export { bot }