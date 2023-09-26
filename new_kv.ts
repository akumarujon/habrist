const kv = await Deno.openKv()

await kv.set(["users"],[])

async function append(user: string) {
    const items = (await kv.get(["users"])).value as string[];
    items.push(user)
    await kv.set(["users"], items)
}

export { append }