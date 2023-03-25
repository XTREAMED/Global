const Discord = require("discord.js");
const globalChannels = [
    "",
    "",
    "" 
];
module.exports = client => {
    
    let buttonrow = new Discord.MessageActionRow().addComponents([
        new Discord.MessageButton().setStyle("LINK").setURL(`https://dsc.gg/MediaVerse`).setLabel("support")
    ]);
    

    client.on("messageCreate", async message => {
        
        if(!message.guild || message.guild.available === false || message.author.bot) return;
        
        if( globalChannels.includes(message.channel.id) ){
            
            const messageData = {
                embeds: [],
                components: [buttonrow],
                files: []
            };
            
            const embed = new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setAuthor(`${message.author.tag}`, message.member.displayAvatarURL({dynamic: true, size: 256}), "https://discord.gg/")
                .setThumbnail(message.member.displayAvatarURL({dynamic: true, size: 256})) 
                .setFooter(`${message.guild.name}・${message.guild.memberCount} Members`, message.guild.iconURL({dynamic: true, size: 256}))
                .setTimestamp()

            
            if(message.content){
                embed.setDescription(`**Message:**\n>>> ${String(message.content).substr(0, 2000)}`)
            }
            
            let url = "";
            let imagename = "UNKNOWN";
            if (message.attachments.size > 0) {
                if(message.attachments.every(attachIsImage)){
                    
                    const attachment = new Discord.MessageAttachment(url, imagename);
                    messageData.files = [attachment]; 
                    embed.setImage(`attachment://${imagename}`); 
                }
            }
            
            function attachIsImage(msgAttach){
                url = msgAttach.url;
                imagename = msgAttach.name || `UNKNOWN`;
                return url.indexOf("png", url.length - 3) !== -1 || url.indexOf("PNG", url.length - 3) !== -1 ||
                    url.indexOf("jpeg", url.length - 4) !== -1 || url.indexOf("JPEG", url.length - 4) !== -1 ||
                    url.indexOf("gif", url.length - 3) !== -1 || url.indexOf("GIF", url.length - 3) !== -1 ||
                    url.indexOf("webp", url.length - 3) !== -1 || url.indexOf("WEBP", url.length - 3) !== -1 ||
                    url.indexOf("webm", url.length - 3) !== -1 || url.indexOf("WEBM", url.length - 3) !== -1 ||
                    url.indexOf("jpg", url.length - 3) !== -1 || url.indexOf("JPG", url.length - 3) !== -1;
            }

            

            messageData.embeds = [embed];

            
            sendallGlobal(message, messageData);
        
        }
    })
    
    async function sendallGlobal(message, messageData) {
        message.react("🌐").catch(()=>{}); 
        let notincachechannels = [];
        
        message.channel.send(messageData).then(msg => {
         
        }).catch((O) => {})

        
        for (const chid of globalChannels){
            
            let channel = client.channels.cache.get(chid);
            if(!channel){
                
                notincachechannels.push(chid);
                continue;
            }
            if(channel.guild.id != message.guild.id){
                channel.send(messageData).then(msg => {
                    
                }).catch((O) => {})
            }
        }
        
        
        for (const chid of notincachechannels){
            
            let channel = await client.channels.fetch(chid).catch(()=>{
                
                console.log(`${chid} is not available!`)
            });
            if(!channel){
                continue;
            }
            if(channel.guild.id != message.guild.id){
                channel.send(messageData).then(msg => {
                    
                }).catch((O) => {})
            }
        }
    }
}

