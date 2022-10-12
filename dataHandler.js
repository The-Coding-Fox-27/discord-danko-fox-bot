
path=require("path")
const slashDataList=require(path.resolve(__dirname, './bot')).slashDataList
async function createCommand(client, guildId) {
  var Data=[]
  // console.log(slashDataList.length)
  slashDataList.forEach(slashData=>{
    Data.push(slashData(client,guildId))
  })

  await client.guilds.cache.get(guildId)?.commands.set(Data);
}

module.exports={createCommand}


  // const data = [
  //   //slash command info
  //   {
  //     name: "echo",
  //     description: "echos message back",
  //     // Basically giving more descriptions and tasks https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
  //     options: [{
  //         name: "text",
  //         type: "STRING",
  //         description: "The input to echo back",
  //         require: true,
  //       },{
  //         name:"lol",
  //         type:"STRING",
  //         description:"DEEZ NUTS",
  //         require:false
  //       }]
  //   },{
  //     name:"ping",
  //     description:'Replying with pong ',
  //   },{
  //     name:"pong",
  //     description:'Replying with pong ',
  //   }
   
  // ];
  //if doing one slash command
  //const command = await client.guilds.cache.get(guildId)?.commands.create(data);
  //if doing multiple