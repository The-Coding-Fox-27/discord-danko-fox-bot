const client = require(path.resolve(__dirname, "../bot")).client
const {createCommand}=require(path.resolve(__dirname, "../dataHandler"))
const collectionMaker=require(path.resolve(__dirname, "../collectionMaker"))

client.on("ready", async () => {

  //basically sets the prescense of the bot
  client.user.setPresence({
    activities: [{ name: "YOU UWU", type: "WATCHING" }],
  });
  
  //Adding slash commands to all guilds currently with the bot
  const Guilds = client.guilds.cache;
  Guilds.forEach(i=>{
    // console.log(i.roles.cache.size)
    // console.log(i.id)
    createCommand(client,i.id)
  }
  )

  //Adding all messages to the cache
  const Channels = client.channels
  channelList=await collectionMaker.roleMessageModel.find({})
  channelList.forEach(async (i)=>{
    targetChannel=await Channels.fetch(i.channelid)
    await targetChannel.messages.fetch(i.messageid)
  })
 
  //If bot undergoes maintenace, we will use this to clear horny jail
  const today=new Date(Date.now())
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() )
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
  hornyList= await collectionMaker.hornyModel.find({sentence:{
    $gte: day, 
    $lt: tomorrow}
  })
  hornyList.forEach(async(i)=>{
    targetChannel=await Channels.fetch(i.channelid)
    targetUser=await targetChannel.member.fetch(i.userid)
    await targetChannel.send(`Okay ${targetUser}, you have served your sentence. You are free from horny jail`)
  })
  
  console.log(`${client.user.tag} is online `);
});
