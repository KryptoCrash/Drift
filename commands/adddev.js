const Discord = require('discord.js');
const devsio = require('../utils/devsio.js');
/**
 *
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first() || message.guild.member(args[0]);
    let userInfo = user.user;
    devsio.readdevs(dataArr => {
        let devList = dataArr;
        if(devList.includes(message.author.id)) {
            let embed = new Discord.RichEmbed()
                .setAuthor('Drift Devtools -', message.author.avatarURL)
                .setTitle("Add Dev")
                .setDescription(`Added ${userInfo.username + "#" + userInfo.discriminator} to the developer list!`)
                .setColor("#e2d81b")
            message.channel.send({embed: embed}).then(message => {
                devList.push(user.id);
                devsio.writedevs(devList, data => {if(!data) console.log("WRITE FAILED.")});
                message.delete(60000);
            }).catch(e => require("../utils/error.js").error(bot, e));
        } else {
            let embed = new Discord.RichEmbed()
                .setAuthor('Drift Devtools -', message.author.avatarURL)
                .setTitle("Add Dev")
                .setDescription(`You do not have permission to run this command!`)
                .setColor("#9c0000")
            message.channel.send({embed: embed}).then(message => message.delete(60000)).catch(e => require("../utils/error.js").error(bot, e));
        }
    })
}

module.exports.help = {
    name: "adddev",
    description:"Adds a developer to the Drift bot.",
    category: ""
}