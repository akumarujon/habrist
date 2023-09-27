import { parseFeed } from "https://deno.land/x/rss@1.0.0/mod.ts";

const url = "https://habr.com/ru/rss/articles/?fl=ru"

async function getFeed() {
  const response = await fetch(
    url,
  );
  const xml = await response.text();
  const feed = await parseFeed(xml);
  
  return feed.entries[0]
}

export { getFeed }
