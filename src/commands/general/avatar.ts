import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { GuildMember, ImageSize, Message, MessageEmbed } from 'discord.js';

export default class Avatar extends Command {
  /**
   * Avatar sizes allowed by the Discord.js API
   */
  private imageSizes = [16, 32, 64, 128, 256, 512, 1024, 2048];

  public constructor() {
    super('avatar', {
      aliases: ['avatar'],
      category: 'General',
      description: {
        content: 'Fetches the avatar / profile picture of a given user.',
        usage: "synus avatar [ user:member = 'you' ] [ -s size:int = 2048 ]",
      },
      args: [
        {
          id: 'user',
          type: 'member',
          match: 'rest',
          default: (message: Message) => message.member,
        },
        {
          id: 'size',
          type: 'integer',
          match: 'option',
          flag: ['-s '],
          default: 2048,
        },
      ],
    });
  }

  public exec(message: Message, args: { user: GuildMember; size: number }): void {
    if (!this.imageSizes.includes(args.size)) {
      message.channel.send(
        `Size must be element of ${TextFormatter.monospace(`[ ${this.imageSizes.join(', ')} ]`)}`
      );
      Logger.log(`Illegal image size (${args.size})`);
      return;
    }

    message.channel.send(
      new MessageEmbed()
        .setTitle(`Avatar of ${args.user.user.tag}`)
        .setColor('RANDOM')
        .setImage(args.user.user.displayAvatarURL({ size: args.size as ImageSize }))
    );

    Logger.log(`Fetched avatar of ${args.user.user.tag}`);
  }
}
