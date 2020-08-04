import { Logger } from '@util/logger';
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
    // Only contains prefix and no command
    if (this.client.isBotPrefix(message.content.trim())) {
      message.channel.send('Ready to help! Type `synus help` to get started.');
      return;
    }

    const splitMessage = message.content.split(' ');
    const prefix = splitMessage.shift();

    if (this.client.isBotPrefix(prefix)) {
      const command = splitMessage.shift();

      if (command && !message.author.bot && message.author.id !== this.client.user.id) {
        const args = splitMessage.join(' ');

        if (!this.client.hasCommand(command)) {
          message.channel.send(`No can do, command \`${command}\` doesn't exist.`);
          Logger.command(
            `${message.author.tag} tried running ${command.toUpperCase()}${
              args ? ` with args [ ${args} ]` : ''
            } in ${message.guild.name} (${message.guild.id})`
          );
          return;
        }

        Logger.command(
          `${message.author.tag} ran ${this.client.commandHandler
            .findCommand(command)
            .id.toUpperCase()}${args ? ` with args [ ${args} ]` : ''} in ${message.guild.name} (${
            message.guild.id
          })`
        );
      }
    }
  }
}
