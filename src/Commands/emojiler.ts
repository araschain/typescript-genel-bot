import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "emojiler",
    description: "💙 Sunucudaki Emojileri Görürsün!!",

    async execute(client, interaction) {
        await interaction.deferReply();

        const emotes = interaction.guild?.emojis.cache.size !== 0 ? interaction.guild?.emojis.cache.map((emoji) => `${interaction.guild?.emojis.cache.get(emoji.id)}`).join("") : "<:eheh:1082704679064064080>"
        var size: number;

        if(interaction.guild?.premiumTier === 0) {
            size = 50;
        } else if(interaction.guild?.premiumTier === 1) {
            size = 100
        } else if(interaction.guild?.premiumTier === 2) {
            size = 150
        } else if(interaction.guild?.premiumTier === 3) {
            size = 300
        }

const embed = new EmbedBuilder()
.setTimestamp()
.setColor('Blue')
.setTitle(`\`${interaction.guild?.name}\` adlı sunucunun emojileri!`)
.setDescription(`${emotes}`)
interaction.followUp({embeds: [embed]})

    }
}