import 'module-alias/register';
import { Synus } from './client/synus';
import { botOwnerIds, botToken } from './config';

const synus: Synus = new Synus({ token: botToken, owners: botOwnerIds });
synus.start();
