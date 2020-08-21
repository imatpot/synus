import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { DateTime } from 'luxon';

export default class Hello extends Command {
  private timePattern = /(?:[01]?|2(?![4-9]))\d:[0-5]\d/g;

  public constructor() {
    super('timezone', {
      aliases: ['timezone', 'tz'],
      category: 'General',
      description: {
        content: 'Convert 24h format times across IANA timezones (e.g. Europe/Oslo).',
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

    if (!this.isValidTimeZone(args.sourceZone)) {
      message.channel.send(`${TextFormatter.monospace(args.sourceZone)} is not a valid timezone.`);
      return;
    }

    if (!this.isValidTimeZone(args.targetZone)) {
      message.channel.send(`${TextFormatter.monospace(args.targetZone)} is not a valid timezone.`);
      return;
    }

    const hours = +args.time.split(':')[0];
    const minutes = +args.time.split(':')[1];

    const helperDate = new Date();
    const now = DateTime.utc(
      helperDate.getFullYear(),
      helperDate.getMonth(),
      helperDate.getDay(),
      hours,
      minutes
    );

    const sourceZoneTime = DateTime.fromFormat(
      now.toFormat("yyyy-MM-dd'T'HH:mm:ss ") + args.sourceZone,
      "yyyy-MM-dd'T'HH:mm:ss z",
      {
        setZone: true,
      }
    );

    const targetZoneTime = sourceZoneTime.setZone(args.targetZone);

    if (!sourceZoneTime.isValid || !targetZoneTime.isValid) {
      message.channel.send('Eek, there was an error converting those time zones.');
      Logger.error('Source invalidReason >> ' + sourceZoneTime.invalidReason);
      Logger.error('Target invalidReason >> ' + sourceZoneTime.invalidReason);
      return;
    }

    const sourceZoneString = sourceZoneTime.toFormat('HH:mm ZZZZ');
    const targetZoneString = targetZoneTime.toFormat('HH:mm ZZZZ');

    message.channel.send(TextFormatter.monospace(`${sourceZoneString}  >>  ${targetZoneString}`));

    Logger.log(`Converted ${sourceZoneString} to ${targetZoneString}`);
  }

  private isValidTimeZone(zone: string) {
    return DateTime.utc().setZone(zone).isValid;
  }
}
