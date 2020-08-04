import { Logger } from '@util/logger';
import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

export default class GuildDeleteEvent extends Listener {
  public constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete',
    });
  }

  public exec(guild: Guild): void {
    Logger.error(
      `[GUILD LEAVE] ${this.client.user.tag} was removed from ${guild.name} (${guild.id})`
    );
  }
}
