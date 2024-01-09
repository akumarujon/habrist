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

async function remove(id: string | number): Promise<void> {
  kv.set(["users"], (await getAll()).filter((item) => item !== id));
}

export { append, getAll, remove };
