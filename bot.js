const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./Commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log('')
        console.log("No commands to be loaded!")
        return;
    }

    console.log(``)
    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args);
})



bot.on("ready", async () => {
    console.log(``)
    console.log(`${bot.user.username} is at your service.`)
    console.log(``)
    console.log("Ready to begin! Serving in " + bot.guilds.length + " guilds.")
    console.log(``)
    console.log(bot.commands)
    bot.user.setPresence({ status: 'online', game: { name: 'Drift is active.' } })
});

<<<<<<< HEAD
music(bot, {
	prefix: '|',       // Prefix of '|'.
	global: false,     // Server-specific queues.
	maxQueueSize: 10,  // Maximum queue size of 10.
	clearInvoker: true, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
    channel: 'music'   // Name of voice channel to join. If omitted, will instead join user's voice channel.
});

<<<<<<< HEAD
bot.login(process.env.TOKEN);
=======
bot.login(botSettings.token);
>>>>>>> parent of 858bd00... Got a lot done; heroku test
=======
bot.login(process.env.BOT_TOKEN);
>>>>>>> parent of 7093dad... Update bot.js
