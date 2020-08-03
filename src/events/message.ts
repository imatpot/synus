import { Logger } from '@src/util/logger';
import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class MessageEvent extends Listener {
  public constructor() {
    super('message', {
      emitter: 'client',
      event: 'message',
      category: 'client',
    });
  }

  public async exec(message: Message): Promise<void> {
    const splitMessage: string[] = message.content.split(' ');
    const prefix: string = splitMessage[0];

    // If prefix is a simple string
    const messageMatchesPrefixString: boolean =
      typeof this.client.commandHandler.prefix === 'string' &&
      this.client.commandHandler.prefix === prefix + ' ';

    // If prefix is a string array
    const messageMatchesPrefixArray: boolean =
      typeof this.client.commandHandler.prefix === 'object' &&
      this.client.commandHandler.prefix.includes(prefix + ' ');

    if (messageMatchesPrefixString || messageMatchesPrefixArray) {
      const command: string = splitMessage[1];

      if (!this.client.commandHandler.findCommand(command)) {
        message.channel.send(`Command \`${command}\` doesn't exist.`);
        return;
      }

      Logger.command(
        `${message.author.tag} ran ${command.toUpperCase()} in ${message.guild.name} (${
          message.guild.id
        })`
      );
    }
  }
}
