const fs = require("node:fs");
const chalk = require("chalk");
//npm i chalk@4.1.2

//Carregar eventos
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            
            if (event.name) {
                console.log(chalk.bgBlueBright.black(` ✔️ => Evento ${file} carregado.`));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Evento ${file} falta um help.name ou help.name não está na string.`));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

//Carregar comandos de prefixo
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
                console.log(chalk.bgBlueBright.black(` ✔️ => Comando de prefixo ${file} carregado.`));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Comando de prefixo ${file} falta um help.name ou help.name não está na string.`));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

//Carregar slashcommands
const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./slashCommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./slashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../slashCommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log(chalk.bgBlueBright.black(` ✔️ => slashcommand ${file} carregado.`));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => slashcommand ${file} falta um help.name ou help.name não está na string.`));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // SlashCommands em servidor específico
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        // SlashCommands global
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}
