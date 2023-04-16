import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "destek-sistemi-sıfırla",
    description: "💙 Destek sistemini sıfırlarsın!",
    options: [],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })

    const basarili = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:tik:1039607067729727519> | __**Destek Sistemi**__ başarıyla sıfırlandı!`)    

    db.delete(`ticketKanal_${interaction.guild?.id}`, true)
    db.delete(`ticketSystem_${interaction.guild?.id}`, true)
    db.delete(`ticketCategory_${interaction.guild?.id}`, true)
    db.delete(`ticketSystemDate_${interaction.guild?.id}`, true)
    db.delete(`ticketLvl_${interaction.guild?.id}`, true)

    return interaction.followUp({ embeds: [basarili] }).catch((e) => { })
        }

    }