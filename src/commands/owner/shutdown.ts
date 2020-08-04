import { Logger } from '@util/logger';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Shutdown extends Command {
  public constructor() {
    super('shutdown', {
      aliases: ['shutdown', 'die'],
      category: 'Owner',
      description: {
        content: 'Good night.',
        usage: 'synus shutdown',
      },
    });
  }

  public async exec(message: Message): Promise<void> {
    if (!this.client.isOwner(message.author)) {
      message.reply('you do not have the required privileges. This incident was reported.');
      Logger.warn(
        `${message.author.tag} was denied privilege for SHUTDOWN in ${message.guild.name}`
      );
      return;
    }

    Logger.notify('Synus is shutting down');
    await message.channel.send("My battery is low and it's getting dark...");

    this.client.destroy();
    process.exit(0);
  }
}
