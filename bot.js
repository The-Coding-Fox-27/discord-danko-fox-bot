const discord= require("discord.js")
const fs= require("fs")

const dotenv=require('dotenv')
dotenv.config()


/*
Step 1: have bot set up
*/
const myIntents=new discord.Intents()
myIntents.add(
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
)

const client= new discord.Client({
    intents:myIntents,
    allowedMentions:{parse:["users","roles"],repliedUser:true}
})
client.slashCommands=new discord.Collection()
client.eventHandler=new discord.Collection()
var slashDataList=[]
/*
Step 2: Set up events
when the bot is ready
When interaction is created
When emote is made to react
*/

fs.readdir("./events",(err,files)=>{
    eventFiles=files.filter(file=>file.endsWith(".js"))
    eventFiles.forEach(file=>{
        const event=require(`./events/${file}`)
        try{
            client.eventHandler.set(event.name,event)
            
        } catch(err){
            throw(err)
        }
    })
})

// this is our command handler

    fs.readdir(`./slashCommands/test`,(err,files)=>{
        if(err) throw err

        var slashFiles= files.filter(file=>file.endsWith(".js"))
        slashFiles.forEach(file=>{
            var slashCommand=require(`./slashCommands/test/${file}`)
            try{
                client.slashCommands.set(slashCommand.help.name,slashCommand)
                slashDataList.push(slashCommand.slashData)
            } catch(err){
                return console.log(err)
            }
        })
    })


//When we need information to be sent to files


module.exports.client=client
module.exports.slashDataList=slashDataList

client.login(process.env.Token);
