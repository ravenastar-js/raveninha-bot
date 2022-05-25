module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "Utility",
    description: "Verificar a latência do bot",
    ownerOnly: false,
    run: async (client, message) => {
        const msg = await message.channel.send(`🏓 Ping...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: 🏓 Pong')
            .addField("Latency", `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
            .addField("API Ping", `${client.ws.ping}ms`, true)
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } });

        msg.delete();
    },
};
