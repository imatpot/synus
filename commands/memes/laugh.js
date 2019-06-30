exports.properties = {
  name: 'laugh',
  aliases: ['xd', 'haha', 'hah'],
  description: 'Make me laugh! Being a bot is lonely...',
  usage: 'synus laugh'
};

exports.execute = (args, message, bot) => {
  message.delete(1000);
  bot.say('Haha, pinnacle of comedy! ' + bot.emojis.get('565932951351590912').toString(), message);
};
