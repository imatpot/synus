# Developer documentation

If you want to work Synus' source code yourself, here's a few things to take a look at before
booting them up the first time.

I'll try my best to keep these as up-to-date as possible. However, if you do run into any issues
regarding anything missing in this file, make sure to notify me!

## API keys & tokens

To work properly, Synus requires API keys.  
Make sure you get your hands on at least one key for each item in this table list before trying
to do anything with the bot itself.

| API key / token | Where?                                                                       | Why?                                                                                                                                                                |
|-----------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bot user token  | [Discord developer console](https://discordapp.com/developers/applications/) | Your bot's gonna need an user to log into Discord.<br>Set up an user like [this](https://discordjs.guide/preparations/setting-up-a-bot-application.html).||are neat |

## Bot config

In `src/` you will find a file called [`config-sample.ts`](../src/config-sample.ts) which contains several config variables. Fill in your details and save the file as `config.ts`
r the list of the required environment variables.

| Variable name | Expected value                                                                   |
|---------------|----------------------------------------------------------------------------------|
| DISCORD_TOKEN | Your bot user token. More info in [this section](#API-keys-&-tokens).            |
| PREFIXES      | An array of prefixes for your bot. Use these to invoke commands.                 |
| OWNERS        | The ID of any Discord users you want to have access to some owner-only commands. |

## Custom emoji

Synus uses some custom emoji to emphasize their character. You can enter your emoji IDs [`src/data/emojis.ts`](../src/data/emojis.ts)

### Where to find the emoji ID for custom emoji

You can get the emoji ID by sending `\:emoji_name:` into any channel that your emoji is accessible
in. For example, the input`\:ping:` will result in `<:ping:565320633471467525>` in my bot emoji
host server.

### Finding custom emoji in code

Usually, custom emoji are retrieved via one of two methods.<br>
They're either referenced directly in a string like so

```ts
`<:_:${emojis.ping}>`
```

or fetched directly via the bot user like so

```ts
this.client.emojis.resolve('565320633471467525')
```
