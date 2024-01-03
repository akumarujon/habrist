import { Bot } from "./deps.ts";
import "https://deno.land/std@0.201.0/dotenv/load.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

export { bot };
