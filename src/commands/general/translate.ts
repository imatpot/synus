import { languageNames } from '@data/language-names';
import { Logger } from '@util/logger';
import { TextFormatter } from '@util/text-formatter';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

// TODO: Check Repo for Typedef update (https://github.com/vitalets/google-translate-api/pull/51)
import translator = require('@vitalets/google-translate-api');

/**
 * Translation object (minimal) from `@vitalets/google-translate-api`
 *
 * https://github.com/vitalets/google-translate-api#returns-an-object
 */
interface Translation {
  text: string;
  from: {
    language: {
      iso: string;
    };
  };
}

export default class Translate extends Command {
  public constructor() {
    super('translate', {
      aliases: ['translate', 'trans', 'tr', 't'],
      category: 'General',
      description: {
        content: 'Translate a given string or a target message.',
        usage:
          "synus translate [ from:string = 'auto' ] [ to:string = 'en' ] [ query:string ] [ -m message:int = 1 ]",
      },
      args: [
        {
          id: 'from',
          type: 'string',
          match: 'phrase',
          default: 'auto',
          index: 0,
        },
        {
          id: 'to',
          type: 'string',
          match: 'phrase',
          default: 'en',
          index: 1,
        },
        {
          id: 'query',
          type: 'string',
          match: 'rest',
          index: 2,
        },
        {
          id: 'message',
          type: 'int',
          match: 'option',
          flag: ['-m '],
          default: 0,
        },
      ],
    });
  }

  public async exec(
    message: Message,
    args: { from: string; to: string; query: string; message: number }
  ): Promise<void> {
    args.from = args.from.toLocaleLowerCase();
    args.to = args.to.toLocaleLowerCase();
    args.message = Number(args.message);

    // Source language is not valid
    if (args.from !== 'auto' && !languageNames[args.from]) {
      message.channel.send(`${args.from.toUpperCase()} is not a valid language code.`);
      return;
    }

    // Target language is not valid
    if (!languageNames[args.to]) {
      message.channel.send(`${args.to.toUpperCase()} is not a valid ISO language code.`);
      return;
    }

    // Message was unset, default to 1
    if (args.message === 0 && !args.query) args.message = 1;

    // Invalid message target and no implicit query
    if (args.message < 1 && !args.query) {
      message.channel.send("Sorry, I can't translate that message.");
      return;
    }

    try {
      const translation: Translation = args.query
        ? await this.translateQuery(args)
        : await this.translateMessage(message, args);

      if (translation) {
        const requestedSourceLanguage = languageNames[args.from];
        const detectedSourceLanguage = languageNames[translation.from.language.iso];
        const targetLanguage = languageNames[args.to];

        const warn = requestedSourceLanguage !== detectedSourceLanguage;

        let response = '';

        if (warn) {
          response += ':warning:    ';
        }

        response +=
          TextFormatter.monospace(`[ ${requestedSourceLanguage} >> ${targetLanguage} ]`) +
          `    ${translation.text}`;

        if (warn) {
          response += `\n\nYou might have meant to translate from ${detectedSourceLanguage} (${translation.from.language.iso.toUpperCase()}) instead. Translation may not be accurate.`;
        }

        message.channel.send(response);
        Logger.log(`Translated "${args.query}" to "${translation.text}"`);
      }
    } catch (error) {
      message.channel.send('Yikes, something went wrong. Try running `synus translate` again.');
      Logger.error(error);
    }
  }

  /**
   * Translate a given string with details in `args`.
   *
   * @param args Arguments of translation request
   * @returns Fetched `Translation` object
   */
  private async translateQuery(args: {
    from: string;
    to: string;
    query: string;
    message: number;
  }): Promise<Translation> {
    return await translator(args.query, {
      from: args.from,
      to: args.to,
    });
  }

  /**
   * Find a message in the invoking message's channel using details in `args` and translate it.
   *
   * @param args Arguments of translation request
   * @returns Fetched `Translation` object
   */
  private async translateMessage(
    message: Message,
    args: {
      from: string;
      to: string;
      query: string;
      message: number;
    }
  ): Promise<Translation> {
    const messageMap = await message.channel.messages.fetch({ limit: args.message + 1 });
    const messages = Array.from(messageMap.values()).sort((m) => m.createdTimestamp);
    args.query = messages.pop().content;

    if (!args.query.trim()) {
      message.channel.send("Sorry, I can't translate that message.");
      return;
    }

    return await translator(args.query, {
      from: args.from,
      to: args.to,
    });
  }
}
