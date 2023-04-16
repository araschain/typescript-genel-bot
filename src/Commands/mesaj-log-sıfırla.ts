import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name:"mesaj-log-sıfırla",
    description: '💙 Mesaj Log sistemini sıfırlarsın!',
    options: [],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Kanalları Yönet` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("ManageChannels")) return interaction.followUp({ embeds: [yetki] })

        db.set(`mesajLog_${interaction.guild?.id}`, true)

        return interaction.followUp("<:tik:1039607067729727519> | Mesaj log kanalı sıfırlandı!")
        }

    }