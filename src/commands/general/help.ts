import { BotUtils } from '@util/bot-utils';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Echo extends Command {
  public constructor() {
    super('help', {
      aliases: ['help', 'h'],
      category: 'General',
      description: {
        content: 'Let me show you what I can do.',
        usage: 'synus help [ command:string ]',
      },
      args: [
        {
          id: 'command',
          type: 'string',
          match: 'rest',
        },
      ],
    });
  }

  public exec(message: Message, args: { command: string }): void {
    if (args.command) this.helpOfCommand(message, args.command);
    else this.helpOverview(message);
  }

  /**
   * Displays an overview of
   *
   * - the bot's prefixes.
   * - all commands with a short description, separated by category.
   * - a tip to run `synus help [command]` for details to a specific command.
   *
   * @param message original command-invoking message
   */
  private helpOverview(message: Message): void {
    
  }

  /**
   * Displays details of a command including
   *
   * - its category.
   * - its aliases.
   * - its description.
   * - its usage.
   * - examples.
   *
   * @param message original command-invoking message
   * @param command command to be explained
   */
  private helpOfCommand(message: Message, command: string): void {
    if (!BotUtils.hasCommand(this.client, command)) {
      message.channel.send(`Command \`${command}\` doesn't exist.`);
      return;
    }

    const commandObject = this.client.commandHandler.findCommand(command);

    let response = '';

    response += commandObject.id.toUpperCase() + '\n\n';

    response += `Category:     ${commandObject.categoryID}\n`;
    response += `Aliases:      ${commandObject.aliases.join(', ')}\n`;
    response += `Description:  ${commandObject.description.content}\n\n`;
    response += `Usage:        ${commandObject.description.usage}`;

    message.channel.send(TextFormatter.codeBlock(response, 'apache'));
  }
}
