import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Source extends Command {
  public constructor() {
    super('source', {
      aliases: ['source', 'code'],
      category: 'Development',
      description: {
        content: 'Check out my source code.',
        usage: 'synus source',
      },
    });
  }

  public exec(message: Message): void {
    message.channel.send(
      'Wann know how I work? Check my source code at <https://github.com/mladenbrankovic/synus>'
    );
  }
}
