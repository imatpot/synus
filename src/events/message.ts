import { Logger } from '@src/util/logger';
import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class MessageEvent extends Listener {
  public constructor() {
    super('message', {
      emitter: 'client',
      event: 'message',
    });
  }

  public exec(message: Message): void {
    const splitMessage: string[] = message.content.split(' ');
    const prefix: string = splitMessage.shift();

    // If prefix is a simple string, match exact
    const messageMatchesPrefixString: boolean =
      typeof this.client.commandHandler.prefix === 'string' &&
      this.client.commandHandler.prefix === prefix + ' ';

    // If prefix is a string array, match any element
    const messageMatchesPrefixArray: boolean =
      typeof this.client.commandHandler.prefix === 'object' &&
      this.client.commandHandler.prefix.includes(prefix + ' ');

    if (messageMatchesPrefixString || messageMatchesPrefixArray) {
      const command: string = splitMessage.shift();

      if (command) {
        const args: string = splitMessage.join(' ');

        if (!this.client.commandHandler.findCommand(command)) {
          message.channel.send(`Command \`${command}\` doesn't exist.`);
          Logger.command(
            `${message.author.tag} tried running ${command.toUpperCase()} ${
              args ? `with args [ ${args} ]` : ''
            } in ${message.guild.name} (${message.guild.id})`
          );
          return;
        }

        Logger.command(
          `${message.author.tag} ran ${command.toUpperCase()} ${
            args ? `with args [ ${args} ]` : ''
          } in ${message.guild.name} (${message.guild.id})`
        );
      }
    }
  }
}
