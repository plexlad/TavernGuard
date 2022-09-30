const config = require('./config.json');
const { SapphireClient, ApplicationCommandRegistries } = require('@sapphire/framework');

// Create the discord client
const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS']});

// Log in to the client, and let the bot run its code!
(async () => {
    await client.login(config.TOKEN);
})();