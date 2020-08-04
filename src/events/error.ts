import { Logger } from '@util/logger';
import { Listener } from 'discord-akairo';

export default class ErrorEvent extends Listener {
  public constructor() {
    super('error', {
      emitter: 'client',
      event: 'error',
    });
  }

  public exec(error: Error): void {
    Logger.error(`Discord.js has thrown an error:\n\n${JSON.stringify(error)}`);
  }
}
