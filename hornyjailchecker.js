path=require("path")
const discord= require("discord.js")
// console.log(process.cwd())
require('dotenv').config()
const myIntents=new discord.Intents()
myIntents.add(
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
)

const client= new discord.Client({
    intents:myIntents,
    allowedMentions:{parse:["users","roles"],repliedUser:true}
})
const collectionMaker=require(path.resolve(__dirname, "./collectionMaker"))
client.login(process.env.TOKEN);
async function hornyjailchecker(Channels){

    const today=new Date(Date.now())
    //const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() )
    
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    let hornyList= await collectionMaker.hornyModel.find({sentence:{
    // $gte: day, 
    $lt: tomorrow}
    })

    for(const i of hornyList){
        let targetChannel=await Channels.fetch(i.channelid)
        let targetUser=await targetChannel.guild.members.fetch(i.userid)
        let searchRole=await targetChannel.guild.roles.cache.find(role=>role.name=="Horny jail")
        await targetChannel.send(`Okay ${targetUser}, you have served your sentence. You are free from horny jail`)
        try{
            await targetUser.roles.remove(searchRole)
        }catch(err){
            console.log(err)
        }
        await collectionMaker.hornyModel.deleteOne({userid:i.userid})
    }
    console.log("hornies checked ")
    return
}
if (require.main === module) {
    
    const Channels = client.channels
    hornyjailchecker(Channels)
  
    
}

module.exports.hornyjailchecker=hornyjailchecker
