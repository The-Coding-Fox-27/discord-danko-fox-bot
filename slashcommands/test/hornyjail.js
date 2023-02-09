const mongoose = require('mongoose');
const fs=require("fs")
path=require("path")
const collectionMaker=require(path.resolve(__dirname, "../../collectionMaker"))

module.exports.execute = async (inter) => {
    const userid=inter.options.getUser("sinner").id
    try{
      var member=await inter.guild.members.fetch(userid)
    }catch(err){
      return await inter.reply({ content: "User not found" ,ephemeral: true});
    }
    
    var searchRole=await inter.guild.roles.cache.find(role=>role.name=="Horny jail")
    
    if (!searchRole){

      await inter.guild.roles.create({
        name:"Horny jail",
      })
      searchRole=await inter.guild.roles.cache.find(role=>role.name=="Horny jail")
    }
    
    if(await member.roles.cache.find(role=>role.name=="Horny jail")){
      return await inter.reply({ content: "USER already is in jail" ,ephemeral: true});

    }else{
      
      const duration=(inter.options.getInteger("duration"))
      const channel=inter.channel.id
      const currentdate= new Date(Date.now())
      const date=currentdate.getDate()
      currentdate.setDate(date+duration)
      collectionMaker.createHornyDocument(userid,currentdate,channel)
      
      await member.roles.add(searchRole)
      await inter.channel.send(`Hear ye, hear ye ${member} has been placed in horny jail for ${duration} days. Pray for your sins.`)
      return await inter.reply({ content: "USER has been placed in horny jail" ,ephemeral: true});
    }
    
  };
  
  module.exports.help = {
    name: "hornyjail",
  };

module.exports.slashData=(client,guildID)=>{
   const data={
        name:"hornyjail",
        description:"Send the sinner to horny jail",
        options:[{
            name:"sinner",
            type:"USER",
            description:"Who did the sin",
            required:true
            },{
            name:"duration",
            type:"INTEGER",
            description:"How long is their sentence (Days only)",
            required:true
            }
        ]
    }
    return data
}