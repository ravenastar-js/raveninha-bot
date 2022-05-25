module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        client.user.setActivity("!RavenaStar👽#0666", {
            type: "WATCHING",
            name: "!RavenaStar👽#0666"
        });
        
        console.log(`👽・${client.user.tag} online em ${client.guilds.cache.size} servidores com ${client.users.cache.size} usuários.`);
    }
}
