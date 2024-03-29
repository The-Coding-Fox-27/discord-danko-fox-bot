const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@dankodiscord.4hkzbnl.mongodb.net/serverDB`)

//Schema for each category
const leaverSchema=new mongoose.Schema({
    channelid: String,
    guildid: String
})

const roleSchema=new mongoose.Schema({
    roleid:String,
    emoji:String,
    channel:String
})

const roleMessageSchema=new mongoose.Schema({
    messageid:String,
    channelid:String,
    mesContent:String,
})

const hornySchema=new mongoose.Schema({
    userid:String,
    sentence: Date,
    channelid:String
})

//Creating the models
const leaverModel=mongoose.model("Leaver",leaverSchema)
const roleModel=mongoose.model("Role",roleSchema)
const roleMessageModel=mongoose.model("Message",roleMessageSchema)
const hornyModel=mongoose.model("Horny",hornySchema)

//Each model functions
function createLeaverDocument(channelid,guildid){
    try{
        const leaverdocument=new leaverModel({
            guildid:guildid,
            channelid:channelid
        })
        leaverdocument.save(function(err){
            if(err){
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
    }
    
}


function createRoleDocument(roleid,emoji,channel){
    try{
        const roledocument=new roleModel({
            roleid:roleid,
            emoji:emoji,
            channel:channel
        })
        roledocument.save(function(err){
            if(err){
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

function createMessageDocument(messageid,mesContent,channelid){
    try{
        const messagedocument=new roleMessageModel({
            messageid:messageid,
            mesContent:mesContent,
            channelid:channelid
        })
        messagedocument.save(function(err){
            if(err){
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

function createHornyDocument(userid,sentence,channelid){
    try{
        const hornydocument=new hornyModel({
            userid:userid,
            sentence:sentence,
            channelid:channelid
        })
        hornydocument.save(function(err){
            if(err){
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

module.exports.roleModel=roleModel
module.exports.roleMessageModel=roleMessageModel
module.exports.hornyModel=hornyModel
module.exports.leaverModel=leaverModel
module.exports.createRoleDocument=createRoleDocument
module.exports.createMessageDocument=createMessageDocument
module.exports.createHornyDocument=createHornyDocument
module.exports.createLeaverDocument=createLeaverDocument