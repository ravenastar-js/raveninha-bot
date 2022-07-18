module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {

            client.user.setActivity({
              name: `!RavenaStar👽#0666`,
              type: 3,
            });
  
        console.log(`👽・${client.user.tag} online em ${client.guilds.cache.size} servidores com ${client.users.cache.size} usuários.`);
    }
}
