import { Listener } from 'discord-akairo';

export default class Ready extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
      category: 'client',
    });
  }

  public async exec(): Promise<void> {
    console.log(this.client.user.tag + ' online!');
  }
}
