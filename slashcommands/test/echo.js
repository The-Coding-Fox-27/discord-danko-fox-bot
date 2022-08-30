module.exports.execute = async (inter) => {
  const text = inter.options.getString("text");
  echoData=inter.options.data
  echoData.forEach(i=>{
    console.log(i)
  })
  //ephermeral is basically stating its only seen by you
  return await inter.reply({ content: text });
};

module.exports.help = {
  name: "echo",
 
};
module.exports.slashData=(client,guildID)=>{
  const data={
    name: "echo",
    description: "echos message back",
    // Basically giving more descriptions and tasks https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
    options: [{
        name: "text",
        type: "STRING",
        description: "The input to echo back",
        require: true,
      },{
        name:"lol",
        type:"STRING",
        description:"DEEZ NUTS",
        require:false
      }]
      
  }
  return data
}
