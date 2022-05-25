const { readdirSync } = require("node:fs");
const Discord = require('discord.js')
const { MessageSelectMenu, MessageActionRow } = require("discord.js")
module.exports = {
    name: "help",
    usage: '/help <commando>',
    options: [
        {
            name: 'commando',
            description: 'Qual comando você precisa de ajuda?',
            type: 'STRING',
            required: false
        }
    ],
    category: "Bot",
    description: "Informar todos os comandos ou um comando específico!",
    ownerOnly: false,
    run: async (client, interaction) => {

        const commandInt = interaction.options.getString("commando");
        if (!commandInt) {

            const botCommandsList = [];
            readdirSync(`./slashCommands/Bot`).forEach((file) => {
                const filen = require(`../../slashCommands/Bot/${file}`);
                const name = `${filen.name}`
                botCommandsList.push(name);
            });

            const utilityCommandsList = [];
            readdirSync(`./slashCommands/Utility`).forEach((file) => {
                const filen = require(`../../slashCommands/Utility/${file}`);
                const name = `${filen.name}`
                utilityCommandsList.push(name);
            });

            let a1 = '979045596465889340'//Bot SlashCommands ( mudar o ID do emoji para um que seu bot tiver acesso)
            let a2 = '817832792732860416' //Utility SlashCommands ( mudar o ID do emoji para um que seu bot tiver acesso)
            let home = '979046183764897862'//home ( mudar o ID do emoji para um que seu bot tiver acesso)

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Ler sobre...')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Bot SlashCommands',
                            emoji: `${a1}`,
                            value: 't1',
                        },
                        {
                            label: 'Utility SlashCommands',
                            emoji: `${a2}`,
                            value: 't2',
                        },
                        {
                            label: 'Home SlashCommands',
                            emoji: `${home}`,
                            value: 'reload',
                        },
                    ]),
            );
            const rowoff = new MessageActionRow()
            .addComponents(
              new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('O tempo acabou, use o comando novamente.')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                  {
                    label: 'desativado',
                    emoji: '🕰️',
                    value: 'd1',
                  },
                ])
                .setDisabled(true)
            );
            const helpEmbed = new client.discord.MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription(` Olá **<@${interaction.member.id}>**, sou <@${client.user.id}>.  \nVocê pode usar \`/help <slashcommand>\` para ver mais informações sobre os SlashCommands!\n\n**Todos os comandos de prefixo:** ${client.commands.size}\n**Todos os SlashCommands:** ${client.slash.size}`)
                await interaction.reply({ embeds: [helpEmbed], components: [row], fetchReply: true, ephemeral: true}).then(async m => {
                    const collector = m.createMessageComponentCollector({time: 600000, componentType: "SELECT_MENU",errors: ['time']})
                    collector.on('collect', async i => {
                        if (i.user.id === interaction.user.id) {
                        if (i.values[0] == "t1") {
                            await i.deferUpdate()
                            const embedt1 = new Discord.MessageEmbed()
                                .setTitle("<:robot_raveninha:979045596465889340> - Bot SlashCommands")
                                .setDescription(`**Comandos de barra \`/\`**\n\`\`\`${botCommandsList.map((data) => `${data}`).join(", ")}\`\`\` `)
                                .setColor(client.config.embedColor)
                                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });
                            i.editReply({ embeds: [embedt1],fetchReply: true, ephemeral: true })
                        }
                    
                        if (i.values[0] == "t2") {
                            await i.deferUpdate()
                            const embedt2 = new Discord.MessageEmbed()
                                .setTitle("<:modmanu_raveninha:817832792732860416> - Utility SlashCommands")
                                .setDescription(`**Comandos de barra \`/\`**\n\`\`\`${utilityCommandsList.map((data) => `${data}`).join(", ")}\`\`\` `)
                                .setColor(client.config.embedColor)
                                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });
                            i.editReply({ embeds: [embedt2] ,fetchReply: true, ephemeral: true })
                        }
    
                        if (i.values[0] == "reload") {
                            i.update({ embeds: [helpEmbed], components: [row],fetchReply: true, ephemeral: true  })
                        }
                    } else {
                        await i.deferUpdate({ephemeral: true })
                      }
                    })
                    collector.on('end', () => {
                        interaction.editReply({ components: [rowoff], fetchReply: true, ephemeral: true  });
                      });
                })
   
        } else {
            const command = client.slash.get(commandInt.toLowerCase());

            if (!command) {
                interaction.reply({ content: `Não há nenhum slashcommands chamado "${commandInt}"`, ephemeral: true });
            } else {

                let command = client.slash.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "Nenhuma descrição"
                let usage = command.usage || "Nenhuma descrição de uso fornecido"
                let category = command.category || "Nenhuma categoria fornecida"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`Slashcommands | \`${(name.toLocaleString())}\``)
                    .addFields(
                        { name: "Descrição", value: `${description}` },
                        { name: "Uso", value: `${usage}` },
                        { name: 'Categoria', value: `${category}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpCmdEmbed], ephemeral: true });
            }
        }
    },
};
