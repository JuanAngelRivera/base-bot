const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'GENERAL',
    data: new SlashCommandBuilder()
        .setName('hola')
        .setDescription('saluda al bot'),

    async execute(interaction) {
        await interaction.reply({
            content: `¡Hola, <@${interaction.user.id}>! 👋`,
            ephemeral: true
        })
    }
};