const mongoose = require('mongoose');
const fs=require("fs")
const collectionMaker=require("../../collectionMaker")

module.exports.execute=async(inter)=>{
    
    const id=inter.options.getRole("role").id
    const channel=inter.channel.id
    await collectionMaker.roleModel.deleteOne({channel:channel,roleid:id})
    return await inter.reply({ content: 'assigned', ephemeral: true });
}

    
module.exports.help = {
    name: "deleterolesassigner",
   
  };
  
module.exports.slashData=(client,guildID)=>{
   const data={
        name:"deleterolesassigner",
        description:"removing a role call emote",
        options:[{
            name:"role",
            type:"ROLE",
            description:"What role?",
            required:true
            }
        ]
    }
    return data
}


