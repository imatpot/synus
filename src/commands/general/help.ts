import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Help extends Command {
  public constructor() {
    super('help', {
      aliases: ['help', 'h'],
      category: 'General',
      description: {
        content: 'Shows an overview of commands or details of one specific command.',
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
    let firstColumnWidth = 'PREFIXES'.length + 3;

    const categories = this.client.commandHandler.categories;

    // Check required width for first column for proper indents
    for (const category of categories.values()) {
      if (category.id.length + 3 > firstColumnWidth) firstColumnWidth = category.id.length + 3;
      for (const command of category.values()) {
        if (command.id.length + 3 > firstColumnWidth) firstColumnWidth = command.id.length + 3;
      }
    }

    // Display prefixes
    let output = TextFormatter.codeBlock(
      'PREFIXES'.padEnd(firstColumnWidth) + this.client.prefixArray.map((p) => p.trim()).join(', '),
      'apache'
    );

    let part = '';

    for (const [key, category] of categories) {
      // Hide Owner commands from non-owners
      if (key === 'Owner' && !this.client.isOwner(message.author)) continue;

      part = category.id.toUpperCase() + '\n\n';

      for (const command of category.values()) {
        part += command.id.padEnd(firstColumnWidth) + command.description.content + '\n';
      }

      part = TextFormatter.codeBlock(part, 'apache');

      // Stay inside Discord message length limit
      if ((output + part).length > 2000) {
        message.channel.send(output);
        output = part;
      } else {
        output += part;
      }
    }

    // Add tip
    part = TextFormatter.codeBlock(
      'TIP'.padEnd(firstColumnWidth) + 'For details, type synus help [ command:string ]',
      'apache'
    );

    // Stay inside Discord message length limit
    if ((output + part).length > 2000) {
      message.channel.send(output);
      output = part;
    } else {
      output += part;
    }

    message.channel.send(output);
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
    // Check if command exists
    if (!this.client.hasCommand(command)) {
      message.channel.send(`No can do, command \`${command}\` doesn't exist.`);
      return;
    }

    // Get command
    const commandObject = this.client.commandHandler.findCommand(command);

    let response = '';

    response += commandObject.id.toUpperCase() + '\n\n';

    response += `Category      ${commandObject.categoryID}\n`;
    response += `Aliases       ${commandObject.aliases.join(', ')}\n`;
    response += `Description   ${commandObject.description.content}\n\n`;
    response += `Usage         ${commandObject.description.usage}`;

    message.channel.send(TextFormatter.codeBlock(response, 'apache'));
  }
}
