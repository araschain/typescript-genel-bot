import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "avatar",
    description: "💙 Birinin Avatarına Bakarsın!",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Kullanıcı belirt.",
            required: true
        }
    ],

    async execute(client, interaction) {
        await interaction.deferReply(); 

        const member = interaction.options.getUser('kullanıcı')

        const embed = new EmbedBuilder()
        .setTitle(`${member?.username} adlı kullanıcının avatarı!`)
        .setImage(`${member?.avatarURL()}`)

        interaction.followUp({
            embeds:[
                embed
            ],
        })
    }
}