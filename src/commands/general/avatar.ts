import { Command } from 'discord-akairo';
import { GuildMember, ImageSize, Message, MessageEmbed } from 'discord.js';

export default class Avatar extends Command {
  private imageSizes = [16, 32, 54, 128, 256, 512, 1024, 2048];

  public constructor() {
    super('avatar', {
      aliases: ['avatar'],
      category: 'general',
      description: {
        content: 'avatar',
        usage: 'avatar [member]',
        examples: ['avatar', 'avatar @Host#0001', 'avatar host'],
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
          type: (_: Message, str: string): null | number => {
            const size = Number(str || 'NaN');
            if (!isNaN(size) && this.imageSizes.includes(size)) return size;
            else return null;
          },
          match: 'option',
          flag: ['--size ', '-s '],
          default: 2048,
        },
      ],
    });
  }

  public async exec(
    message: Message,
    args: { member: GuildMember; size: number }
  ): Promise<Message> {
    return message.util.send(
      new MessageEmbed()
        .setTitle(`Avatar of ${args.member.user.tag}`)
        .setColor('RANDOM')
        .setImage(args.member.user.displayAvatarURL({ size: args.size as ImageSize }))
    );
  }
}
