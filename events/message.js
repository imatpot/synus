require('dotenv').config();

module.exports = (bot, message) => {
  const prefixes = bot.environment.BOT_PREFIXES.split(',');

  if (message.author.bot) return;

  const args = message.content.split(/ +/g);
  const prefix = args.shift().toLowerCase();

  // Ping by mention
  if (message.isMentioned(bot.user.id)) bot.commands.get('ping').execute(args, message, bot);

  // Check if it has Synus' prefix
  if (!prefixes.includes(prefix)) return;

  // People who forget to type the actual command might appreciate this
  if (prefixes.includes(message.content.trim())) {
    bot.say('Ready to help! Type `synus help` to get started.', message);
    return;
  }
  
  let command = args.shift().toLowerCase();

  // At this point, only actual arguments are left in args

  if (!bot.commands.has(bot.aliases.get(command)) && !bot.commands.has(command)) {
    bot.say(`Command \`${command}\` doesn't exist.`, message);
    return;
  }

  try {
    if (!bot.commands.has(command)) command = bot.aliases.get(command);
    bot.console.command(`${message.author.tag} ran ${command.toUpperCase()} in ${message.guild.name} (${message.guild.id})`);
    bot.commands.get(command).execute(args, message, bot);
  } catch (error) {
    bot.console.error(`${command.toUpperCase()} [${args}] => ${error}`);
    bot.say(`Hmm. That didn't work. Maybe try to run \`${command}\` again?`, message);
  }
};