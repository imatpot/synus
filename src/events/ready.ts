import { Logger } from '@src/util/logger';
import { Listener } from 'discord-akairo';

export default class ReadyEvent extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  public exec(): void {
    Logger.notify(`${this.client.user.tag} is now online`);

    this.client.user.setPresence({
      status: 'online',
      activity: {
        type: 'PLAYING',
        name: 'hide and seek with bugs',
      },
    });
  }
}
