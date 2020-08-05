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
      return;
    }

    const messageMap = await message.channel.messages.fetch({ limit: args.message + 1 });
    const messages = Array.from(messageMap.values()).sort((m) => m.createdTimestamp);
    const targetMessage = messages.pop().content;

    if (!targetMessage.trim()) {
      message.channel.send("Sorry, I can't abbreviate that message.");
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
