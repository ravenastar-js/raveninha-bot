
module.exports = {
    name: "ping",
    category: "Utility",
    description: "Verificar a latência do bot",
    ownerOnly: false,
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`🏓 Ping...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: 🏓 Pong')
            .addField("Latência", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
            .addField("API Ping", `${client.ws.ping}ms`, true)
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await interaction.reply({ embeds: [pingEmbed] });

        msg.delete();
    },
};
