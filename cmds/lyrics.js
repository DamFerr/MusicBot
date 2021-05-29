const { MessageButton } = require("gcommands");
const { MessageEmbed } = require("discord.js");
const { requestLyricsFor } = require("solenolyrics");

module.exports = {
    name: "lyrics",
    description: "Show music text",
    guildOnly: "847485277484220447",
    aliases: ["lyr"],
    run: async({client, interaction, respond, guild, edit, member}) => {
      let msgId = Date.now();
      let error = (c) => respond({ content: `:x: *${c}*`, ephemeral: true });

      if (!client.music.data[guild.id].isPlaying) return error("I'm not playing anything");
      
      let lyrics = await requestLyricsFor(client.music.playing[guild.id].video.title)
      if(!lyrics) return error("I didn't find the lyrics for this song.")

      let embed = new MessageEmbed()
        .setAuthor("Music Buttons | Lyrics")
        .setDescription(lyrics)
        .setColor("#cf293f");

      respond({
        content: embed
      })
    }
}