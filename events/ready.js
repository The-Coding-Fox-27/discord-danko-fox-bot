const client = require("../bot").client;
const {createCommand}=require('../dataHandler')
client.on("ready", async () => {
  //basically sets the prescense of the bot
  client.user.setPresence({
    activities: [{ name: "YOU UWU", type: "WATCHING" }],
  });
  console.log(`${client.user.tag} is online `);
  
  //
  const Guilds = client.guilds.cache;
  Guilds.forEach(i=>{
    // console.log(i.roles.cache.size)
    // console.log(i.id)
    createCommand(client,i.id)
  }
  )
  



});
