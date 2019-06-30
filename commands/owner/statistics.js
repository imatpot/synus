require('moment-duration-format');

const Discord = require('discord.js');
const moment = require('moment');

module.exports.properties = {
  name: 'statistics',
  aliases: ['stats'],
  description: 'Bot stats',
  usage: 'synus stats'
};

module.exports.execute = (args, message, bot) => {
  let output = '';

  const uptime = moment.duration(bot.uptime).format('D [days], H [hours], m [minutes], s [seconds]');
  const users = bot.users.size.toLocaleString();
  const servers = bot.guilds.size.toLocaleString();
  const channels = bot.channels.size.toLocaleString();
  const discordJsVersion = 'v' + Discord.version;
  const nodeJsVersion = process.version;

  // Output builder
  output += 'STATISTICS  \n\n';
  output += `Uptime:     ${uptime}\n`;
  output += '\n';
  output += `Users:      ${users}\n`;
  output += `Servers:    ${servers}\n`;
  output += `Channels:   ${channels}\n`;
  output += '\n';
  output += `DiscordJS:  ${discordJsVersion}\n`;
  output += `Node:       ${nodeJsVersion}`;

  bot.say(bot.formatter.codeBlock(output, 'apache'), message);

  bot.console.log(`Uptime:     ${uptime}`);
  bot.console.log(`Users:      ${users}`);
  bot.console.log(`Servers:    ${servers}`);
  bot.console.log(`Channels:   ${channels}`);
  bot.console.log(`DiscordJS:  ${discordJsVersion}`);
  bot.console.log(`Node:       ${nodeJsVersion}`);
};
