import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Say extends Command {
  public constructor() {
    super('say', {
      aliases: ['say', 'echo'],
      category: 'General',
      description: {
        content: "I'll repeat after you.",
        usage: 'synus say [ text:string ]',
      },
      args: [
        {
          id: 'text',
          type: 'string',
          match: 'rest',
        },
      ],
    });
  }

  public exec(message: Message, args: { text: string }): void {
    message.channel.send(args.text || 'Ehrm, what should I repeat?');
  }
}
