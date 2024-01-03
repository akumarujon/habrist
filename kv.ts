const kv = await Deno.openKv();

const users = (await kv.get(["users"])).value;

if (users == null) {
  await kv.set(["users"], []);
}

async function append(user: string) {
  const items = (await kv.get<string[]>(["users"])).value as string[];
  items.push(user);
  await kv.set(["users"], items);
}

async function getAll(): Promise<string[]> {
  return (await kv.get<string[]>(["users"])).value as string[];
}

export { append, getAll };
