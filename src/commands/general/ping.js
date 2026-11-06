const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'GENERAL',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Comprueba la latencia del bot'),

        async execute(interaction) {
            const latency = interaction.client.ws.ping;

            await interaction.reply({
                content: `🏓 ¡Pong! Latencia: ${latency} milisegundos`,
                ephemeral: true});
        }
};