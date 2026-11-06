const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'GENERAL',
    data: new SlashCommandBuilder()
        .setName('ayuda')
        .setDescription('muestra los comandos disponibles'),

    async execute(interaction) {
        const commands = interaction.client.commands;

        const categories = {};

        commands.forEach(command => {
            
            const category = command.category ? command.category.toUpperCase() : 'GENERAL';

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(`\`/${command.data.name}\` - ${command.data.description}`);
        });

        const helpEmbed = new EmbedBuilder()
            .setTitle('📖 Comandos Disponibles')
            .setColor(0x3498db)
            .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
            .setFooter({
                text: `${interaction.client.user.username}`,
                iconURL: `${interaction.client.user.displayAvatarURL()}`
            })
            .setTimestamp();

        for (const [category, commandList] of Object.entries(categories)) {
            helpEmbed.addFields({
                name: `📁 ${category}`,
                value: commandList.join('\n') || 'No hay comandos en esta categoría.'
            });
        }

        await interaction.reply({
            embeds: [helpEmbed],
        });
    }
};