exports.run = (bot) =>
{
  console.log(`\n\n${bot.user.username} is at your service.`);
  console.log("\n\nReady to begin! Serving in " + bot.guilds.size + " guilds.\n\n");
  bot.user.setPresence({ status: "online", game: { name: "in " + bot.guilds.size + " servers." } });



};