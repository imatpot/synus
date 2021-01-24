import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Token which Discord.js uses for logging into the bot.
 */
export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN;

/**
 * Prefixes for which the bot will scan when expecting a command.
 * Automatically adds spaces to the end.
 */
export const PREFIXES: string[] = process.env.PREFIXES.split(',').map(p => p + ' ');

/**
 * List of Discord user IDs of users who have elevated command privileges.
 */
export const OWNERS: string[] = process.env.OWNERS.split(',');
