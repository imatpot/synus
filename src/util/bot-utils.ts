import { AkairoClient } from 'discord-akairo';

/**
 * Provides a series of static functions to check properties of the bot.
 */
export class BotUtils {
  /**
   * Checks if a given string is one of the bot's prefixes.
   *
   * @param bot Discord bot client
   * @param prefix string to be checked
   */
  public static isBotPrefix(bot: AkairoClient, prefix: string): boolean {
    // If prefix is a simple string, match exact
    const messageMatchesPrefixString =
      typeof bot.commandHandler.prefix === 'string' && bot.commandHandler.prefix === prefix + ' ';

    // If prefix is a string array, match any element
    const messageMatchesPrefixArray =
      typeof bot.commandHandler.prefix === 'object' &&
      bot.commandHandler.prefix.includes(prefix + ' ');

    return messageMatchesPrefixString || messageMatchesPrefixArray;
  }

  /**
   * Checks if a given string is one of the bot's prefixes.
   *
   * @param bot Discord bot client
   * @param prefix string to be checked
   */
  public static hasCommand(bot: AkairoClient, command: string): boolean {
    return bot.commandHandler.findCommand(command) !== undefined;
  }
}
