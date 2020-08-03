import { botOwnerIds, botPrefixes } from '@src/config';
import { Logger } from '@src/util/logger';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
  }
}

interface Config {
  token?: string;
  owners?: string[];
}

export class Synus extends AkairoClient {
  public config: Config;

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, 'events'),
  });

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, 'commands'),
    prefix: botPrefixes.map((p) => p + ' '),
    commandUtil: true,
    commandUtilLifetime: 3e5, // 5 minutes
    ignorePermissions: botOwnerIds,
  });

  public constructor(config: Config) {
    super({ ownerID: config.owners });
    this.config = config;
  }

  public async start(): Promise<string> {
    await this.init();

    Logger.log('Logging in');
    return this.login(this.config.token);
  }

  private async init(): Promise<void> {
    Logger.log('Initializing');

    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    Logger.log('Loading commands');
    this.commandHandler.loadAll();

    Logger.log('Loading event listeners');
    this.listenerHandler.loadAll();
  }
}
