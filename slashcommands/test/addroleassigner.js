const mongoose = require('mongoose');
const fs=require("fs")
const collectionMaker=require("app/collectionMaker")

module.exports.execute=async(inter)=>{
    
    const id=inter.options.getRole("role").id
    const emoji=(inter.options.getString("emoji"))
    const channel=inter.channel.id

    //First check if document exist
    roleDoc=await collectionMaker.roleModel.findOne({roleid:id,channel:channel})

    
    if(roleDoc){
        await roleDoc.updateOne({emoji:emoji})
   //if not create document 
    }else{
        collectionMaker.createRoleDocument(id,emoji,channel)
    }
    
    return await inter.reply({ content: 'assigned', ephemeral: true });
    // console.log(message.data)
}

module.exports.roleList=async()=>{
    return await collectionMaker.roleModel.find({})
}
  
    
module.exports.help = {
    name: "addrolesassigner",
   
  };
module.exports.slashData=(client,guildID)=>{
   const data={
        name:"addrolesassigner",
        description:"Adding a role call emote",
        options:[{
            name:"role",
            type:"ROLE",
            description:"What role?",
            required:true
            },{
            name:"emoji",
            type:"STRING",
            description:"What role?",
            required:true
            }
        ]
    }
    return data
}


