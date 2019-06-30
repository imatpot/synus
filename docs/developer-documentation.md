# Developer documentation

If you want to work Synus' source code yourself, here's a few things to take a look at before
booting him up the first time.

I'll try my best to keep these as up-to-date as possible. However, if you do run into any issues
regarding anything missing in this file, make sure to notify me!



## API keys & tokens

To work properly, Synus requires API keys.  
Make sure you get your hands on at least one key for each item in this table list before trying
to do anything with the bot itself.

| API key / token | Where?                                                                       | Why?                                                                                                                                                                |
|-----------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bot user token  | [Discord developer console](https://discordapp.com/developers/applications/) | Your bot's gonna need an user to log into Discord.<br>Set up an user like [this](https://discordjs.guide/preparations/setting-up-a-bot-application.html).||are neat |



## Environment variables

Rather than a simple `config.json`, Synus uses environment variables to store data. You can store
your environment variables in the system you want Synus to run in. However, a `.env` file in your
project root will suffice during development.

The `.env` file will look something like this:
```md
BOT_PREFIXES="synus,s"
BOT_TOKEN="U1Tr4.53cR3t-T0k3N"
```

### Which ones do I need?

Now for the list of the required environment variables.

| Variable name | Expected value                                                                                 |
|---------------|------------------------------------------------------------------------------------------------|
| BOT_PREFIXES  | A pseudo-array of prefixes, values separated by commas. <br> Example: `BOT_PREFIXES="synus,s"` |
| BOT_TOKEN     | Your bot user token. More infos in [this section](#API-keys-&-tokens).                         |
| OWNER_ID      | The ID of *your own* Discord user. This is required for some owner-only commands.              |



## Custom emoji

Synus uses some custom emoji to emphasize his character. I'll provide a list of all occurences of
custom emoji, since they are a pain to track down. You can either replace or remove them, none
are essential for anything to work. If you do replace them, make sure your bot is in a server
with that specific emote at all times!

| Custom emoji occurences                                     | Approximate location     |
|-------------------------------------------------------------|--------------------------|
| [`data/greetings.json`](../data/greetings.json)             | End of `greetings` array |
| [`commands/general/about.js`](../commands/general/about.js) | `output` builder         |
| [`commands/general/ping.js`](../commands/general/ping.js)   | `output` builder         |

### Where do I find the emoji ID for my custom emoji?

You can get the emoji ID by sending `\:emoji_name:` into any channel that your emoji is accessible
in. For example, the input`\:mavna:` will result in `<:mavna:520310830240366602>` in my bot emoji
host server.

### Having trouble finding the emoji in my code?

Usually, custom emoji are retrieved via one of two methods.<br>
They're either referenced directly in a string like
```md
<:mavna:520310830240366602>
```

Or fetched directly via the bot user like
```js
bot.emojis.get('565320633471467525')
```