import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Ping extends Command {
  public constructor() {
    super('ping', {
      aliases: ['ping'],
      category: 'general',
      description: {
        content: 'pppinng',
        usage: 'ping',
        examples: ['ping'],
      },
    });
  }

  public async exec(message: Message): Promise<Message> {
    return message.util.send('Pong. ' + this.client.ws.ping + 'ms');
  }
}
