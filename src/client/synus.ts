import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { botOwnerIds, botPrefixes } from '../config';
import Console from '../util/console';

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

export default class Synus extends AkairoClient {
  public config: Config;
  public console: Console = new Console();

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'events'),
  });

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: botPrefixes.map((p) => p + ' '),
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5, // 5 minutes
    ignorePermissions: botOwnerIds,
  });

  public constructor(config: Config) {
    super({ ownerID: config.owners });
    this.config = config;
  }

  private async init(): Promise<void> {
    this.console.log('Initializing');

    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.console.log('Loading commands');
    this.commandHandler.loadAll();

    this.console.log('Loading event listeners');
    this.listenerHandler.loadAll();
  }

  public async start(): Promise<string> {
    await this.init();

    this.console.log('Logging in');
    return this.login(this.config.token);
  }
}
