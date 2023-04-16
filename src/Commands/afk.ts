import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "afk",
    description: "💙 Afk Olursun!",
    options: [
        {
            type: 3,
            name: "sebep",
            description: "Afk sebebi.",
            required: true
        }
    ],

    async execute(client, interaction) {
        await interaction.deferReply(); 

        const sebep = interaction.options.get("sebep")?.value

        db.set(`afk_${interaction.user.id}`, {
sebep:  `${sebep}`
        })
        db.set(`afkDate_${interaction.user.id}`, {
            afkDate:  Date.now(),
        })

        interaction.followUp("<:tik:1039607067729727519> | Başarıyla Afk Oldun!")
    }
}