const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@dankodiscord.4hkzbnl.mongodb.net/serverDB`)

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


const roleModel=mongoose.model("Role",roleSchema)
const  roleMessageModel=mongoose.model("Message",roleMessageSchema)


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
module.exports.roleModel=roleModel
module.exports.roleMessageModel=roleMessageModel
module.exports.createRoleDocument=createRoleDocument
module.exports.createMessageDocument=createMessageDocument