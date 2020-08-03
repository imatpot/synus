import 'module-alias/register';
import { botOwnerIds, botToken } from './config';
import { Synus } from './synus';

const synus: Synus = new Synus({ token: botToken, owners: botOwnerIds });
synus.start();
