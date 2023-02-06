path=require("path")

const roleList=require(path.resolve(__dirname,"./addroleassigner")).roleList
const collectionMaker=require(path.resolve(__dirname, "../../collectionMaker"))
const client =require(path.resolve(__dirname, "../../bot")).client
const reactionComp=require(path.resolve(__dirname, "../../reactionComp"))

module.exports.execute = async (inter) => {
    var txt=""
    
    discordRoles=await roleList()
    var channelRoles=[]
    discordRoles.forEach((role)=>{
      if(role.channel==inter.channel.id){
          channelRoles.push(role)
          let roleName=inter.guild.roles.cache.find(index=>index.id==role.roleid)
          txt += `${roleName.name} : ${role.emoji} \n`;
      }
    })

    if(txt){
      messageDoc=await collectionMaker.roleMessageModel.findOne({channelid:inter.channel.id})
      
      if(messageDoc){

        await messageDoc.updateOne({mesContent:txt})
        lmao=messageDoc.messageid
        target=await client.channels.cache.get(inter.channel.id).messages.fetch(lmao)
        await target.edit(txt)

  
        reactionComp.reactionremove(messageDoc,inter.client)
        reactionComp.reactionadd(channelRoles,messageDoc,inter.client)

      }else{
        
        message=await inter.channel.send(txt)
        console.log(message)
        console.log(message.id)
        collectionMaker.createMessageDocument(message.id,message.content,message.channel.id)
        reactionComp.reactionadd(channelRoles,message.id,inter.client)
      }
    }

    //ephermeral is basically stating its only seen by you
    return await inter.reply({ content: 'done', ephemeral: true });
  };
  
  module.exports.help = {
    name: "deployroles",
  }

  module.exports.slashData=(client,guildID)=>{
    // console.log(client.guilds.cache.get(`${guildID}`).roles.cache.size)
    const data= {
      name:"deployroles",
      description:'Deploys your role assigners',
      default_member_permissions: false
    }
    return data
  }


