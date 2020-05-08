const devsio = require('../utils/devsio.js');

module.exports.run = (bot, message, args) => {
  devsio.readdevs(devs => {
  if (!devs.includes(message.author.id)) return;
  const content = message.content.split(' ').slice(1).join(' ');
  const result = new Promise((resolve, reject) => resolve(eval(content)));

  return result.then(output => {
    if (typeof output !== 'string') output = require('util').inspect(output, {
      depth: 0
    });
    if (output.includes(bot.token)) output = output.replace(bot.token, 'Not for your eyes');
    if (output.length > 1990) console.log(output), output = 'Too long to be printed (content got console logged)';

    return message.channel.send(output, {
      code: 'js'
    });
  }).catch(err => {
    console.error(err);
    err = err.toString();

    if (err.includes(bot.token)) err = err.replace(bot.token, 'Not for your eyes');

    return message.channel.send(err, {
      code: 'js'
    });
  });
})
}


exports.help = {
  name: "eval",
  description:"Evaluates Code.",
  category: ""
}
