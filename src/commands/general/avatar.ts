import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { GuildMember, ImageSize, Message, MessageEmbed } from 'discord.js';

export default class Avatar extends Command {
  private imageSizes = [16, 32, 64, 128, 256, 512, 1024, 2048];

  public constructor() {
    super('avatar', {
      aliases: ['avatar'],
      category: 'general',
      description: {
        content: 'avatar',
        usage: 'avatar [member] (-s)',
        examples: [
          'avatar',
          'avatar @target#0001',
          'avatar target',
          'avatar target -s 64',
          'avatar target --size 12',
        ],
      },
      args: [
        {
          id: 'member',
          type: 'member',
          match: 'rest',
          default: (message: Message) => message.member,
        },
        {
          id: 'size',
          type: (_: Message, value: string): null | number =>
            isNaN(Number(value)) ? null : Number(value),
          match: 'option',
          flag: ['--size ', '-s '],
        },
      ],
    });
  }

  public exec(message: Message, args: { member: GuildMember; size: number }): void {
    if (!args.size) args.size = 2048;

    if (!this.imageSizes.includes(args.size)) {
      message.channel.send(
        `Size must be element of ${TextFormatter.monospace(`[ ${this.imageSizes.join(', ')} ]`)}`
      );
      return;
    }

    message.channel.send(
      new MessageEmbed()
        .setTitle(`Avatar of ${args.member.user.tag}`)
        .setColor('RANDOM')
        .setImage(args.member.user.displayAvatarURL({ size: args.size as ImageSize }))
    );

    Logger.log(`Fetched avatar of ${args.member.user.tag}`);
  }
}
