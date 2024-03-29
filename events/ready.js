/*/When initialize
1)Adding slash command to all guilds within the bot
2)Adding all messages to the cache, preferably the ones from the message checker

*/
const client = require(path.resolve(__dirname, "../bot")).client
const {createCommand}=require(path.resolve(__dirname, "../dataHandler"))
const collectionMaker=require(path.resolve(__dirname, "../collectionMaker"))
const hornyjailchecker = require(path.resolve(__dirname, "../hornyjailchecker")).hornyjailchecker

client.on("ready", async () => {

  //basically sets the prescense of the bot
  client.user.setPresence({
    activities: [{ name: "YOU UWU", type: "WATCHING" }],
  });
  
  //Adding slash commands to all guilds currently with the bot
  const Guilds = client.guilds.cache;
  Guilds.forEach(i=>{
    createCommand(client,i.id)
  }
  )

  //Adding all messages to the cache
  const Channels = client.channels
  channelList=await collectionMaker.roleMessageModel.find({})
  channelList.forEach(async (i)=>{
    try{
      targetChannel=await Channels.fetch(i.channelid)
      if(targetChannel){
        await targetChannel.messages.fetch(i.messageid)
      }
    }
    catch(err){
      console.log(err)
    }
  })
 

  hornyjailchecker(Channels)

  
  
  console.log(`${client.user.tag} is online `);
});
