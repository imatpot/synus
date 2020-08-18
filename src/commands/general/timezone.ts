import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { tz } from 'moment-timezone';

export default class Hello extends Command {
  private timePattern = /(?:[01]?|2(?![4-9]))\d:[0-5]\d/g;

  public constructor() {
    super('timezone', {
      aliases: ['timezone', 'tz'],
      category: 'General',
      description: {
        content: 'Convert times across timezones. Requires 24h format, apologies to the US.',
        usage: 'synus timezone [ time:string ] [ sourceZone:string ] [ targetZone:string ]',
      },
      args: [
        {
          id: 'time',
          type: 'string',
          match: 'phrase',
          index: 0,
        },
        {
          id: 'sourceZone',
          type: 'string',
          match: 'phrase',
          index: 1,
        },
        {
          id: 'targetZone',
          type: 'string',
          match: 'phrase',
          index: 2,
        },
      ],
    });
  }

  public exec(
    message: Message,
    args: { time: string; sourceZone: string; targetZone: string }
  ): void {
    if (!args.time || !args.sourceZone || !args.targetZone) {
      message.channel.send('Too few arguments. Run `synus help timezone` for more info.');
      return;
    }

    if (!args.time.match(this.timePattern)) {
      message.channel.send(
        `${TextFormatter.monospace(args.time)} is not a valid 24h formatted time.`
      );
      return;
    }

    if (
      !tz
        .names()
        .map(zone => zone.toLowerCase())
        .includes(args.sourceZone.toLowerCase())
    ) {
      message.channel.send(`${TextFormatter.monospace(args.sourceZone)} is not a valid timezone.`);
      return;
    }

    if (
      !tz
        .names()
        .map(zone => zone.toLowerCase())
        .includes(args.targetZone.toLowerCase())
    ) {
      message.channel.send(`${TextFormatter.monospace(args.targetZone)} is not a valid timezone.`);
      return;
    }

    const hour = +args.time.split(':')[0];
    const minute = +args.time.split(':')[1];
    const now = new Date();

    const helperDate = new Date(now.getFullYear(), now.getMonth(), now.getDay(), hour, minute);

    const sourceTime = tz(helperDate, args.sourceZone).format('HH:mm z');
    const targetTime = tz(helperDate, args.targetZone).format('HH:mm z');

    message.channel.send(TextFormatter.monospace(`${sourceTime}  >>  ${targetTime}`));

    Logger.log(`Converted ${sourceTime} to ${targetTime}`);
  }
}
