import 'module-alias/register';
import { DISCORD_TOKEN, OWNERS } from './config';
import { Synus } from './synus';

const synus: Synus = new Synus({ token: DISCORD_TOKEN, owners: OWNERS });
synus.start();
