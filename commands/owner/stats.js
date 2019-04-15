require('moment-duration-format');

const Discord = require('discord.js');
const moment = require('moment');

module.exports.properties = {
    name: 'stats',
    aliases: ['statistics'],
    description: 'Bot stats',
    usage: 'synus stats'
};

module.exports.execute = (args, message, bot) => {
        const uptime = moment.duration(bot.uptime).format('D [days], H [hours], m [minutes], s [seconds]');
        let output = '';

        // Output builder
        output += 'STATISTICS \n\n';
        output += `Uptime:     ${uptime}\n`;
        output += '\n';
        output += `Users:      ${bot.users.size.toLocaleString()}\n`;
        output += `Servers:    ${bot.guilds.size.toLocaleString()}\n`;
        output += `Channels:   ${bot.channels.size.toLocaleString()}\n`;
        output += '\n';
        output += `DiscordJS:  v${Discord.version}\n`;
        output += `Node:       ${process.version}`;

        bot.echo(bot.formatter.apacheCodeBlock(output), message);
};
