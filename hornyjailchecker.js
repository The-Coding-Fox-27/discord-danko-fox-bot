path=require("path")
const collectionMaker=require(path.resolve(__dirname, "./collectionMaker"))
const client = require(path.resolve(__dirname, "./bot")).client
async function hornyjailchecker(Channels){

    const today=new Date(Date.now())
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() )
    
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    hornyList= await collectionMaker.hornyModel.find({sentence:{
    // $gte: day, 
    $lt: tomorrow}
    })

    hornyList.forEach(async(i)=>{
    targetChannel=await Channels.fetch(i.channelid)
    targetUser=await targetChannel.guild.members.fetch(i.userid)
    var searchRole=await targetChannel.guild.roles.cache.find(role=>role.name=="Horny jail")
    await targetChannel.send(`Okay ${targetUser}, you have served your sentence. You are free from horny jail`)
    try{
        await targetUser.roles.remove(searchRole)
    }catch(err){
        console.log(err)
    }
    await collectionMaker.hornyModel.deleteOne({userid:i.userid})
    
    })
    return 0
}
if (require.main === module) {
    
    const Channels = client.channels
    hornyjailchecker(Channels)
}
module.exports.hornyjailchecker=hornyjailchecker
