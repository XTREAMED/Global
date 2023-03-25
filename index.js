const Discord = require("discord.js"); //discord.js v13
const config = require(`./config.json`);
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: { parse: [ ], repliedUser: false },
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.login(process.env.token)


client.on("ready", () => {
    console.log(`Logged in ${client.user.tag}`)
    
    require("./global.js")(client); 
})

