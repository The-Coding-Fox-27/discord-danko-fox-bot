module.exports.execute = async (inter) => {
    
    let roleName= await inter.channel.send("hiiii")
  
    //ephermeral is basically stating its only seen by you
    return await inter.reply({ content: 'ponffffffg', ephemeral: true });
  };
  
  module.exports.help = {
    name: "ping",
  }
  module.exports.slashData=(client,guildID)=>{
    console.log(client.guilds.cache.get(`${guildID}`).roles.cache.size)
    const data= {
      name:"ping",
      description:'Replhrying with pong ',
    }
    return data
  }