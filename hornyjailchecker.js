path=require("path")
const collectionMaker=require(path.resolve(__dirname, "./collectionMaker"))
const client = require(path.resolve(__dirname, "./bot")).client.channles
async function hornyjailchecker(Channels){

    const today=new Date(Date.now())
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() )
    
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    let hornyList= await collectionMaker.hornyModel.find({sentence:{
    // $gte: day, 
    $lt: tomorrow}
    })

    hornyList.forEach(async(i)=>{
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
    })
}
if (require.main === module) {
    
    const Channels = client.channels
    hornyjailchecker(Channels)
}

module.exports.hornyjailchecker=hornyjailchecker
