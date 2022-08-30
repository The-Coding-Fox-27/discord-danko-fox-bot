
//function that add based on text and roles
module.exports.reactionadd=async (roleData,messageData,client)=>{
    var chan= await client.channels.fetch(messageData.channelid)
     
    var mes=await chan.messages.fetch(messageData.messageid)
    roleData.forEach(async role=>{
        await mes.react(role.emoji)

    })
    
}

module.exports.reactionremove=async (messageData,client)=>{
    var chan= await client.channels.fetch(messageData.channelid)
    var mes=await chan.messages.fetch(messageData.messageid)
    await mes.reactions.removeAll()
}