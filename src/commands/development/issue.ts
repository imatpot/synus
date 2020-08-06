import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Issue extends Command {
  public constructor() {
    super('issue', {
      aliases: ['issue', 'bug'],
      category: 'Development',
      description: {
        content: 'Report an issue.',
        usage: 'synus issue',
      },
    });
  }

  public exec(message: Message): void {
    message.channel.send(
      'Did I do an oopsie? Report here: https://github.com/mladenbrankovic/synus/issues/new'
    );
  }
}
