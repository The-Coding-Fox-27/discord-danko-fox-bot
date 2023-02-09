const { Guild } = require("discord.js");

const client = require(path.resolve(__dirname, "../bot")).client
const collectionMaker=require(path.resolve(__dirname, "../collectionMaker"))
//when person enters slash command and interacts with it
client.on("guildMemberRemove", async (member) => {
    //check which guild member is from 
    guild=member.guild
    const doc=collectionMaker.leaverModel.findOne({guildid:guild.id})
    //if guild is found within database, alert channel used for officers 
    if(doc){
        const channel=await guild.cache(guild.id)
    }
});