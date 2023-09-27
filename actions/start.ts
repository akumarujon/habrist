import { bot } from "../bot.ts"
import { append, getAll } from "../kv.ts"
import { getFeed } from "../feed.ts"

bot.command("start",async (ctx) => {
    const users = await getAll()
    if(!users.includes(`${ctx.message?.chat.id}`))
    append(`${ctx.message?.chat.id}`)
    await ctx.reply("A'zolik qo'shildi.")
})

const kv = await Deno.openKv()

setInterval(async() =>{
    let last_feed = (await kv.get(["article"])).value
    let feed = await getFeed()
    
    if(last_feed.id != feed.id){
    
        console.log("new")

        for(let id of await getAll()){
            let result:string = `${feed.title?.value}\n\n${feed.description?.value}<a href='${feed.id}'></a>`
                    .replaceAll("<p>", " ")
                    .replaceAll("</p>", " ")
                    .replaceAll("<br>", "\n")

            bot.api.sendMessage(id, result, {parse_mode: "HTML"})
        }
    } else {
        console.log("Last")
    }
    await kv.set(["article"], feed)
}, 5000 );
