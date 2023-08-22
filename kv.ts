// Open the default database for the script.
const kv = await Deno.openKv();

async function addUser(id) {
    let length = await getUsers()
    await kv.set(["user", ++length.length], {"id": id})
}

async function getUsers() {
const users = [];
  for await (const res of kv.list({ prefix: ["user"] })) {
    users.push(res.value.id)
  }

  return [...new Set(users)]
}

export {getUsers, addUser}
export {kv}