path=require("path")
const slashDataList=require(path.resolve(__dirname, './bot')).slashDataList

async function createCommand(client, guildId) {
  var Data=[]
  slashDataList.forEach(slashData=>{

    Data.push(slashData(client,guildId))
  
  })
  await client.guilds.cache.get(guildId)?.commands.set(Data);
}

module.exports={createCommand}


  //if doing one slash command
  //const command = await client.guilds.cache.get(guildId)?.commands.create(data);
  //if doing multiple