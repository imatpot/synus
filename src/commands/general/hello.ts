import { greetings } from '@data/greetings';
import { Logger } from '@util/logger';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Hello extends Command {
  public constructor() {
    super('hello', {
      // All unique greeting strings
      aliases: Array.from(new Set(greetings.greetings.map((s) => s.split('  ')[1].toLowerCase()))),
      category: 'General',
      description: {
        content: 'Greet me.',
        usage: 'synus hello',
      },
    });
  }

  public exec(message: Message): void {
    const greeting = greetings.greetings[this.randomInt(greetings.greetings.length)];
    message.channel.send(greeting);

    Logger.log(`Greeted ${message.author.tag} saying ${greeting}`);
  }

  /**
   * Generates a random integer between 0 (inclusive) and `max` (exclusive).
   *
   * @param max exclusive maximum
   */
  private randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
