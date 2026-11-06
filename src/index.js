require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {

    const folderPath = path.join(commandsPath, folder);

    const files = fs.readdirSync(folderPath)
        .filter(file => file.endsWith('.js'));

    for (const file of files) {

        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        command.category = folder;

        client.commands.set(
            command.data.name,
            command);

        console.log(`Comando cargado: ${command.data.name}`);
    }
}

client.once('clientReady', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);

        const response = {
            content: 'Ocurrió un error al ejecutar el comando',
            ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(response);
        } else {
            await interaction.reply(response);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);