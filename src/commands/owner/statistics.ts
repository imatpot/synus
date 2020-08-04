import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { formatDuration, getTime, intervalToDuration } from 'date-fns';
import { Command } from 'discord-akairo';
import { Message, version as DiscordJSVersion } from 'discord.js';

export default class Statistics extends Command {
  public constructor() {
    super('statistics', {
      aliases: ['statistics', 'stats'],
      category: 'Owner',
      description: {
        content: "Displays the bot's stats.",
        usage: 'synus statistics',
      },
    });
  }

  public exec(message: Message): void {
    if (!this.client.isOwner(message.author)) {
      message.reply('you do not have the required privileges. This incident was reported.');
      Logger.warn(
        `${message.author.tag} was denied privilege for SHUTDOWN in ${message.guild.name}`
      );
      return;
    }

    const now = new Date();

    const uptime = formatDuration(
      intervalToDuration({
        start: new Date(getTime(now) - this.client.uptime),
        end: now,
      })
    );
    const users = this.client.users.cache.size.toString();
    const servers = this.client.guilds.cache.size.toString();
    const channels = this.client.channels.cache.size.toString();
    const discordJsVersion = 'v' + DiscordJSVersion;
    const nodeJsVersion = process.version;

    let response = '';
    response += 'STATISTICS  \n\n';
    response += `Uptime      ${uptime}\n\n`;
    response += `Users       ${users}\n`;
    response += `Servers     ${servers}\n`;
    response += `Channels    ${channels}\n\n`;
    response += `DiscordJS   ${discordJsVersion}\n`;
    response += `Node        ${nodeJsVersion}`;

    message.channel.send(TextFormatter.codeBlock(response, 'apache'));
  }
}
