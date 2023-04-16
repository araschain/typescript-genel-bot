import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name:"görsel-engel",
    description: '💙 Görsel engel sistemini ayarlarsın!',
    options: [
        {
            name: "kanal",
            description: "Görsel engel kanalını ayarlarsın!",
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

    const gorselEngelChannel = interaction.options.get('kanal')?.channel

    if (!interaction.memberPermissions?.has("ManageChannels")) return interaction.followUp({ embeds: [yetki] })

        db.set(`görselengel.${interaction.guild?.id}`, gorselEngelChannel?.id)

        return interaction.followUp("<:tik:1039607067729727519> | <#"+gorselEngelChannel+"> kanalında sadece gif ve resimlere izin vereceğim!")

        }

    }