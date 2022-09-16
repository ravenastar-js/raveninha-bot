module.exports = {
    name: "sounds",
    aliases: ["play", "voice"],
    category: "Music",
    description: "Tocar um audio",
    ownerOnly: false,
    run: async (client, message, args) => {
        //npm i ffmpeg
        //npm i @discordjs/voice
        //npm i tweetnacl
        //npm i ffmpeg-static
        const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
        const path = require('path');
        const { list } = require('../../util/Util');
        const sounds = require('../../jsons/soundboard');
        const soundsChoice = sounds.map(sound => sound[sound.length - 1].replace(/\.mp3$/, ''));

        let msg = message
        let sound = args[0]
        if (!sound) return message.channel.send(`🔴 | Você não informou nenhuma música, use  **<prerfix>sounds <nome_da_música>**\n> exemplo: \`${client.config.prefix}sounds start-a-cult\`\n\`\`\`${list(soundsChoice, 'ou')}\`\`\``)
        const choice = sound.toLowerCase().replace(/( )+/g, '-').replace(/( )+/g, '-').replace(/( )+/g, '-').replace(/( )+/g, '-').replace(/( )+/g, '-')
        if (soundsChoice.includes(choice)) {
            sounds.find(snd => snd.includes(`${choice}.mp3`))
        } else {
            return message.channel.send(`🔴 | Você não informou nenhuma música, use  **<prerfix>sounds <nome_da_música>**\n> exemplo: \`${client.config.prefix}sounds start-a-cult\`\n\`\`\`${list(soundsChoice, 'ou')}\`\`\``)
        }
        const player = createAudioPlayer();

        try {
            await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            }).subscribe(player)

        } catch (err) {
            return msg.reply(`🔴 | Eu não estou em um canal de voz válido.`);
        }
        const connection = getVoiceConnection(msg.guild.id)
        if (!connection) {
            return msg.reply(`🔴 | Eu não estou em um canal de voz.`);
        }

        const resource = createAudioResource(path.join(__dirname, '..', '..', 'assets', 'sounds', 'soundboard', `${choice}.mp3`));
        player.play(resource)
        msg.react("🔉")
        
        player.on('error', error => {
            console.error(error);
        });

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    },
};
