import { greetings } from '@data/greetings';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Ping extends Command {
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
    message.channel.send(greetings.greetings[this.randomInt(greetings.greetings.length)]);
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
