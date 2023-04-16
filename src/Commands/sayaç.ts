import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name:"sayaç",
    description: '💙 Sayaç sistemini ayarlarsın!',
    options: [
        {
            name: "kanal",
            description: "Sayaç kanalını ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Kanalları Yönet` yetkisine sahip olmalısın!")

    const sayacChannel = interaction.options.get('kanal')?.channel

    if (!interaction.memberPermissions?.has("ManageChannels")) return interaction.followUp({ embeds: [yetki] })

        db.set(`sayac_${interaction.guild?.id}`, { channel: sayacChannel?.id })

        return interaction.followUp("<:tik:1039607067729727519> | Sayaç kanalı <#"+sayacChannel+"> olarak ayarlandı!")
        }

    }