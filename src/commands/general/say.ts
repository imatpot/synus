import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Echo extends Command {
  public constructor() {
    super('say', {
      aliases: ['say', 'echo'],
      category: 'General',
      description: {
        content: "I'll repeat after you.",
        usage: 'synus say [ text:string ]',
      },
    });
  }

  public exec(message: Message): void {
    // Remove prefix and command
    const echo = message.content
      .split(' ')
      .splice(2, message.content.split(' ').length - 1)
      .join(' ');

    message.channel.send(echo || 'Ehrm, what should I repeat?');
  }
}
