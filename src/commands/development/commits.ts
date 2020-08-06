import { Logger } from '@util/logger';
import { parseISO } from 'date-fns';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import fetch from 'node-fetch';

export default class Commits extends Command {
  public constructor() {
    super('commits', {
      aliases: ['commits', 'updates'],
      category: 'Development',
      description: {
        content: 'Shows the up to ten latest updates to my source code.',
        usage: 'synus commits [ amount:int = 3 ]',
      },
      args: [
        {
          id: 'amount',
          type: 'integer',
          match: 'rest',
          default: 3,
        },
      ],
    });
  }

  public async exec(message: Message, args: { amount: number }): Promise<void> {
    if ((await message.guild.fetchWebhooks()).array().length === 10) {
      message.channel.send(
        "I'll need to create a Webhook for that, but this server already has reached the max amount of 10. More info here: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
      );
      Logger.log(`Too many webhooks in ${message.guild.name} (${message.guild.id})`);
      return;
    }

    if (args.amount > 10 || args.amount < 1) {
      message.channel.send('Amount of commits must be between 1 and 10.');
      Logger.log(`Illegal amount of commits (${args.amount})`);
      return;
    }

    const commits = await fetch(
      'https://api.github.com/repos/mladenbrankovic/synus/commits'
    ).then((commitList) => commitList.json());

    Logger.log('Commits fetched');

    const commitEmbeds: MessageEmbed[] = [];

    for (let i = 0; i < args.amount; i++) {
      const commit = commits[i];

      commitEmbeds.push(
        new MessageEmbed()
          .setTitle(commit.commit.message)
          .setURL(commit.url)
          .setAuthor(commit.author.login, commit.author.avatar_url, commit.author.html_url)
          .setTimestamp(parseISO(commit.commit.committer.date))
          .setFooter(commit.sha)
      );
    }

    const webhook = await (message.channel as TextChannel).createWebhook(
      this.client.user.username,
      {
        avatar: this.client.user.avatarURL().replace('.webp', '.png'),
      }
    );

    Logger.log('Webhook created');

    await webhook.send({
      embeds: commitEmbeds,
    });

    Logger.log('Embeds sent');

    await webhook.delete('Unused');
    Logger.log('Deleted Webhook');
  }
}
