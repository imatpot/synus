exports.properties = {
  name: 'shutdown',
  aliases: ['die'],
  description: 'Good night.',
  usage: 'synus shutdown'
};

exports.execute = async (args, message, bot) => {
  if (bot.permissions.isOwner(bot, message.author.id)) {
    await bot.say('My battery is low and it\'s getting dark...', message);
    bot.console.notify('[SHUTDOWN] Synus is shutting down');
    setTimeout(() => {
      bot.destroy();
      process.exit(0);
    }, 500);
  } else {
    message.reply('you do not have the required privileges.');
    bot.console.warn(`${message.author.tag} was denied privilege for SHUTDOWN in ${message.guild.name}`);
  }
};
