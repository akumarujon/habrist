// Import necessary modules
import { bot } from "../bot.ts";
import { append, getAll, remove } from "../kv.ts";
import { getFeed } from "../feed.ts";
import { GrammyError } from "../deps.ts";

// Define a command handler for the "start" command
bot.command("start", async (ctx) => {
  // Retrieve all users from the key-value store
  const users = await getAll();
  // Check if the current chat id is not in the list of users, and add it if not
  if (!users.includes(`${ctx.message?.chat.id}`)) {
    append(`${ctx.message?.chat.id}`);
  }

  // Send a welcome message to the user
  await ctx.reply(
    "A'zolik qo'shildi.\nYou will be notified when an article is out.",
  );
});

// Open the key-value store
const kv = await Deno.openKv();

// Set a default value for the "last" key if it does not exist
if ((await kv.get<string>(["last"])).value == null) {
  await kv.set(["last"], "nah");
}

// Schedule a cron job to check for new articles
Deno.cron("send an article", "* * * * *", async () => {
  // Retrieve the latest article from the feed
  const feed = await getFeed();
  // Retrieve the last article id from the key-value store
  const last = (await kv.get<string>(["last"])).value;

  // Extract the id from the feed
  const feed_id = feed.id.match(/\d+/g)?.[0];

  // Check if the current feed id is different from the last one
  if (feed_id != last) {
    // Update the last article id in the key-value store
    await kv.set(["last"], feed_id);

    // Retrieve the list of users from the key-value store
    const users = (await kv.get<string[]>(["users"])).value as string[];
    console.log("Users:", users);
    console.log("Last article: ", last);
    console.log("Feed: ", feed_id);

    // Construct the response message with the article details
    const response = `${feed.title?.value}\n\n${
      feed.description?.value?.replace(/<\/?p>/g, "").replace("<br>", "\n")
        .replace(/<img\s+src="[^"]*"\s*\/?>/g, "")
    }\n\n${feed.id}`;

    // Send the response message to each user
    for (const user of users) {
      try {
        // Send the message using the bot's API
        await bot.api.sendMessage(user, response, {
          parse_mode: "HTML",
        });
      } catch (err) {
        console.log(err);
        // Handle errors from the bot API
        if (err instanceof GrammyError) {
          console.log(err.description);
          // Remove the user from the list if there's an error
          await remove(user);
          console.log("Removed");
        } else {
          console.log("Other error:", err);
        }
      }
    }
  }
});
