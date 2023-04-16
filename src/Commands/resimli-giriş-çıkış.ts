import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name:"resimli-giriş-çıkış",
    description: '💙 Resimli Giriş Çıkış sistemini ayarlarsın!',
    options: [
        {
            name: "kanal",
            description: "Resimli Giriş Çıkış kanalını ayarlarsın!",
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

    const resimliGiris = interaction.options.get('kanal')?.channel

    if (!interaction.memberPermissions?.has("ManageChannels")) return interaction.followUp({ embeds: [yetki] })

        db.set(`canvaskanal_${interaction.guild?.id}`, { channel: resimliGiris?.id })

        return interaction.followUp("<:tik:1039607067729727519> | Resimli Giriş Çıkış <#"+resimliGiris+"> olarak ayarlandı!")
        }

    }