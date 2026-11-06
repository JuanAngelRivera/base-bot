require('dotenv').config();

const { REST, Routes } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const commands = []

const commandsPath = path.join(__dirname, 'src', 'commands');

const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
    console.log(folder)
    const folderPath = path.join(commandsPath, folder);

    const files = fs.readdirSync(folderPath)
        .filter(file => file.endsWith('.js'));

    for (const file of files) {
        
        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        commands.push(command.data.toJSON());
    }
}

const rest = new REST({version: 10})
    .setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log('Registro de comandos...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {body : commands}
        );

        console.log('¡Comandos registrados correctamente!');
    }
    catch(error) {
        console.error(error)
    }
}

deployCommands();