const { Subcommand } = require('@sapphire/plugin-subcommands'),
    { isMessageInstance } = require('@sapphire/discord.js-utilities'),
    config = require('../config.json');

class NewCommand extends Subcommand {
    constructor(context, options) {
        super(context, {
            ...options,
            // Where you put the different subcommands
            // Put more utilities here!
            subcommands: [
                {
                    name: 'ping',
                    chatInputRun: 'chatInputPing' 
                },
                {
                    name: 'shutdown',
                    chatInputRun: 'chatInputShutdown'
                }
            ]
        });
    }

    // Where slash commands are registered
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('utilities')
                .setDescription('Utilities for mods and developers.')
                .addSubcommand((command) => command
                    .setName('ping')
                    .setDescription(`Great for testing bot speed and if it's working`))
                .addSubcommand((command) => command
                    .setName('shutdown')
                    .setDescription('Turn off permissions for @everyone to speak in channels'))
                
                // Register more subcommands here! Don't forget to add them in the constructor
        });
    }

    // Ping command for testing
    async chatInputPing(interaction) {
        const msg = await interaction.reply({ content: 'Ping?', ephemeral: true, fetchReply: true });

        if (isMessageInstance(msg)) {
            let diff = msg.createdTimestamp - interaction.createdTimestamp;

            return interaction.editReply(`Pong! Round trip was ${diff}ms`);
        }

        return interaction.editReply('Failed to retrieve ping');
    }

    // Turns off messaging 
    async chatInputShutdown(interaction) {
        let guild = interaction.guild;
        let guildChannels = guild.channels.cache;

        guildChannels.forEach(async (k, v) => {
            if (k.type == 'GUILD_CATEGORY' && config.channels.categoryShutdownExcluded.indexOf(k.id) < 0) {
                await k.permissionOverwrites.create(interaction.guild.roles.everyone, {SEND_MESSAGES: false})
            }
        });

        return interaction.reply({ content: 'All channels muted (except for excluded)', ephemeral: true});
    }
}

module.exports = {
    NewCommand
}