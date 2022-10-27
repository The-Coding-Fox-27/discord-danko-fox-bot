const mongoose = require('mongoose');
const fs=require("fs")
path=require("path")
const collectionMaker=require(path.resolve(__dirname, "../../collectionMaker"))

module.exports.execute = async (inter) => {

    const userid=inter.options.getUser("sinner").id
    const duration=(inter.options.getString("duration"))
    const channel=inter.channel.id
    const currentdate= new Date(Date.now())
    currentdate.setDate(currentdate.getDate+duration)
    currentdate.toDateString()
    collectionMaker.createHornyDocument(userid,currentdate,channel)
    var member=await inter.guild.member.fetch(userid)
    var searchRole=await inter.guild.roles.cache.find(role=>role.name=="horny jail")
    member.roles.add(searchRole)
    inter.channel.send(`Hear ye, hear ye @${member.nickname} has been placed in horny jail. Pray for your sins`)

    //ephermeral is basically stating its only seen by you
    return await inter.reply({ content: "USER has been placed in horny jail" });
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