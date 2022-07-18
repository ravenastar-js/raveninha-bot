const { readdirSync } = require("node:fs");

// Examplo de comando de ajuda

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: '!help <commando>',
    category: "Bot",
    description: "Informar todos os comandos ou um comando específico!",
    ownerOnly: false,
    run: async (client, message, args) => {

        if (!args[0]) {

            const botCommandsList = [];
            readdirSync(`./commands/Bot`).forEach((file) => {
                const filen = require(`../../commands/Bot/${file}`);
                const name = `\`${filen.name}\``
                botCommandsList.push(name);
            });

            const utilityCommandsList = [];
            readdirSync(`./commands/Utility`).forEach((file) => {
                const filen = require(`../../commands/Utility/${file}`);
                const name = `\`${filen.name}\``
                utilityCommandsList.push(name);
            });

            const helpEmbed = new client.discord.EmbedBuilder()
                .setTitle(`${client.user.username} Help`)
                .setDescription(` Olá **<@${message.author.id}>**, Eu sou <@${client.user.id}>.  \nVocê pode usar \`!help <commando>\` para ver mais informações sobre os comandos!\n**Todos os comandos de prefixo:** ${client.commands.size}\n**Todos os SlashCommands:** ${client.slash.size}`)
                .addFields(
                    {name:"🤖 - Bot Commands", value: botCommandsList.map((data) => `${data}`).join(", ")},
                    {name:"🛠 - Utility Commands", value: utilityCommandsList.map((data) => `${data}`).join(", ")}
                )
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            message.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false }});
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if (!command) {
                message.reply({ content: `Não há nenhum comando chamado "${args[0]}"`, allowedMentions: { repliedUser: false } });
            } else {

                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "Nenhuma descrição"
                let usage = command.usage || "Nenhuma descrição de uso fornecido"
                let aliases = command.aliases || "Nenhuma aliases"
                let category = command.category || "Nenhuma categoria fornecida"

                let helpCmdEmbed = new client.discord.EmbedBuilder()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
                    .addFields(
                        { name: "Descrição", value: `${description}` },
                        { name: "Uso", value: `${usage}` },
                        { name: "Aliases", value: `${aliases}` },
                        { name: 'Categoria', value: `${category}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                message.reply({ embeds: [helpCmdEmbed], allowedMentions: { repliedUser: false } });
            }
        }
    },
};
