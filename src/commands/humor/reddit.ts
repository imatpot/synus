import { Logger } from '@util/logger';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class Reddit extends Command {
  private validSections = ['new', 'top', 'controversial', 'hot', 'rising'];

  public constructor() {
    super('reddit', {
      aliases: ['reddit', 'meme'],
      category: 'Humor',
      description: {
        content: 'Fetches the first lit meme from any subreddit and any section.',
        usage: "synus meme [ subreddit:string = 'memes' ] [ section:string = 'new' ]",
      },
      args: [
        {
          id: 'subreddit',
          type: 'string',
          match: 'phrase',
          index: 0,
          default: 'memes',
        },
        {
          id: 'section',
          type: 'string',
          match: 'phrase',
          index: 1,
          default: 'new',
        },
      ],
    });
  }

  public async exec(message: Message, args: { subreddit: string; section: string }): Promise<void> {
    if (!this.validSections.includes(args.section)) {
      message.channel.send(`Section must be element of [ ${this.validSections.join(', ')} ]`);
      Logger.log(`Illegal section ${args.section}`);
      return;
    }

    args.subreddit = args.subreddit.replace('r/', '');

    const post = await fetch(
      `https://api.reddit.com/r/${args.subreddit}/${args.section}.json?sort=new&limit=1`
    ).then((res) => res.json());

    if (post.error === 404 || post.data.children[0] === undefined) {
      message.channel.send(
        `Sorry, the subreddit \`r/${args.subreddit}\` has restricted access or doesn't exist.`
      );
      Logger.log(`Restricted or inexistant subreddit r/${args.subreddit}`);
      return;
    }

    const data = post.data.children[0].data;

    Logger.log(`Fetched post from r/${args.subreddit}`);

    const user = (
      await fetch(`https://api.reddit.com/user/${data.author}/about.json`).then((userResponse) =>
        userResponse.json()
      )
    ).data;

    Logger.log(`Fetched u/${data.author}`);

    const subreddit = await fetch(
      `https://api.reddit.com/r/${args.subreddit}/about.json`
    ).then((subredditResponse) => subredditResponse.json());

    Logger.log(`Fetched details of r/${args.subreddit}`);
    Logger.log('Building embed');

    const embed = new MessageEmbed()
      .setColor('#FF4500')
      .setTitle(data.title)
      .setURL('https://www.reddit.com' + data.permalink);

    // Handle deleted users
    data.author === '[deleted]'
      ? embed.setAuthor('u/[deleted]', '', 'https://www.reddit.com')
      : embed.setAuthor(
          `u/${user.name}`,
          user.icon_img.split('?')[0],
          `https://www.reddit.com/user/${user.name}`
        );

    // Catch NSFW content
    if (data.over_18) {
      embed.addField('This post is NSFW', 'I hid it for you, just in case.', true);
    } else {
      embed.setDescription(data.selftext);
      if (
        data.url.includes('.jpeg') ||
        data.url.includes('.jpg') ||
        data.url.includes('.gif') ||
        data.url.includes('.png')
      ) {
        embed.setImage(data.url);
      }
    }

    embed.setTimestamp(data.created_utc * 1000);
    embed.setFooter(data.subreddit_name_prefixed, subreddit.icon_img);

    message.channel.send(embed);
    Logger.log('Posted embed');
  }
}
