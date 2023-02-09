module.exports.execute = async (inter) => {
    
    
  
    //ephermeral is basically stating its only seen by you
    return await inter.reply({ content: 'pong', ephemeral: true });
  };
  
  module.exports.help = {
    name: "ping",
  }
  module.exports.slashData=(client,guildID)=>{
    
    const data= {
      name:"ping",
      description:'Replying with pong ',
    }
    return data
  }