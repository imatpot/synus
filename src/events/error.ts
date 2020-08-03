import { Logger } from '@src/util/logger';
import { Listener } from 'discord-akairo';

export default class ErrorEvent extends Listener {
  public constructor() {
    super('error', {
      emitter: 'client',
      event: 'error',
      category: 'client',
    });
  }

  public async exec(error: Error): Promise<void> {
    Logger.error(`Discord.js has thrown an error:\n\n${JSON.stringify(error)}`);
  }
}
