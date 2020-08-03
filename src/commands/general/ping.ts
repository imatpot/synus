import { emojis } from '@src/data/emojis';
import { Logger } from '@src/util/logger';
import { TextFormatter } from '@src/util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Ping extends Command {
  public constructor() {
    super('ping', {
      aliases: ['ping'],
      category: 'general',
      description: {
        content: 'Pings the bot and measures the latencies.',
        usage: 'synus ping',
        examples: ['synus ping'],
      },
    });
  }

  public async exec(message: Message): Promise<void> {
    const pong = await message.util.send('Pinging...');

    const synusLatency = `${pong.createdTimestamp - message.createdTimestamp}ms`;
    const discordApiLatency = `${Math.round(this.client.ws.ping)}ms`;

    pong.edit(
      [
        this.client.emojis.resolve(emojis.ping).toString(),
        TextFormatter.monospace('Synus latency: ' + synusLatency),
        TextFormatter.monospace('DiscordJS API latency: ' + discordApiLatency),
      ].join('  ')
    );

    Logger.log(`Synus latency:          ${synusLatency}`);
    Logger.log(`DiscordJS API latency:  ${discordApiLatency}`);
  }
}
