import { Logger } from '@util/logger';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Abbreviate extends Command {
  public constructor() {
    super('abbreviate', {
      aliases: ['abbreviate', 'abbr'],
      category: 'Humor',
      description: {
        content: 'Abbreviate a previously sent message.',
        usage: 'synus abbreviate [ message:int = 1 ]',
      },
      args: [
        {
          id: 'message',
          type: 'integer',
          match: 'rest',
          default: 1,
        },
      ],
    });
  }

  public async exec(message: Message, args: { message: number }): Promise<void> {
    if (args.message < 1) {
      message.channel.send("Sorry, I can't abbreviate that message.");
      Logger.log(`Invalid message target (${args.message})`);
      return;
    }

    const targetMessage = (await this.client.messageFromChannel(message.channel, args.message))
      .content;

    if (!targetMessage.trim()) {
      message.channel.send("Sorry, I can't abbreviate that message.");
      Logger.log('Query is empty');
      return;
    }

    let abbreviation = '';

    // Split by spaces and remove empty entries
    const words = targetMessage.split(' ').filter((s) => s);

    for (const word of words) {
      abbreviation += word[0].toLowerCase();
    }

    message.channel.send(abbreviation);
    Logger.log(`Abbreviated "${targetMessage}" to "${abbreviation}"`);
  }
}
