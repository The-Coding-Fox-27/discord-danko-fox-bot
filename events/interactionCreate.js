const client = require(path.resolve(__dirname, "../bot")).client
//when person enters slash command and interacts with it
client.on("interactionCreate", async (inter) => {

  if (inter.isCommand()) {
    let slashCommand = client.slashCommands.get(inter.commandName);
    //if(inter.member.permissions.has(slashCommand.help.memberpersmission))
    if (slashCommand) slashCommand.execute(inter);
    
  }
});
