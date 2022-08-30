const collectionMaker=require(path.resolve(__dirname, './collectionMaker'))
const client = require(path.resolve(__dirname, './bot')).client;
client.on("messageReactionRemove",async (MesReact,user)=>{
    if (user.bot){
        return
    }
    //Get emoji and channel id 
    var emoji=MesReact.emoji.toString()
    
    var channel=MesReact.message.channel.id
    // find the document in database
 
    var roleDoc=await collectionMaker.roleModel.findOne({emoji:emoji,channel:channel})   
    var messageDoc=await collectionMaker.roleMessageModel.findOne({channelid: channel})
 
    //add user to role
    if(roleDoc&& messageDoc){
        var userID=user.id
        
        var member=await MesReact.message.guild.members.fetch(userID)
        
        var searchRole=await MesReact.message.guild.roles.cache.find(role=>role.id==roleDoc.roleid)

        
        try{
            await member.roles.remove(searchRole)
        }catch(err){
            console.log(err)
        }
    }
   
    


})
