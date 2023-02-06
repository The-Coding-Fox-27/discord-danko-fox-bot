module.exports.execute = async (inter) => {
    
    
  
    //ephermeral is basically stating its only seen by you
    return await inter.reply({ content: 'pong', ephemeral: true });
  };
  
  module.exports.help = {
    name: "ping",
  }
  module.exports.slashData=(client,guildID)=>{
    console.log(client.guilds.cache.get(`${guildID}`).roles.cache.size)
    const data= {
      name:"ping",
      description:'Replying with pong ',
    }
    return data
  }