const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'GENERAL',
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('muestra el avatar de un miembro del servidor')
        .addUserOption(option => option
            .setName('usuario')
            .setDescription('usuario al que obtener el avatar')
            .setRequired(false)
        ),

    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario') || interaction.user;

        const avatar = usuario.displayAvatarURL({
            dynamic: true,
            size: 1024,
            extension: 'png'
        });

        const avatarEmbed = new EmbedBuilder()
            .setTitle('Avatar')
            .setDescription(`de <@${usuario.id}>`)
            .setImage(`${avatar}`)

        await interaction.reply({
            embeds: [avatarEmbed]
        });
    }
}