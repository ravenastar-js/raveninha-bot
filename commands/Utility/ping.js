module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "Utility",
    description: "Verificar a latência do bot",
    ownerOnly: false,
    run: async (client, message) => {
        const msg = await message.channel.send(`🏓 Ping...`);

        const pingEmbed = new client.discord.EmbedBuilder()
            .setTitle(':signal_strength: 🏓 Pong')
            .addFields(
                {name:"Latência", value:`${Math.floor(msg.createdAt - message.createdAt)}ms`},
                {name:"API Ping", value:`${client.ws.ping}ms`}
                )
            .setColor(client.config.embedColor)
            .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        await message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } });

        msg.delete();
    },
};
