import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "yeni-hesap-engel",
    description: "💙 Yeni hesap engel sistemini ayarlarsın!",
    options: [
        {
            name: "log-kanalı",
            description: "Yeni hesap olan üyeler engellendiğinde mesaj gidecek kanal.",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "cezalı-rolü",
            description: "Yeni hesap olan üyelere verilecek rol.",
            type: 8,
            required: true,
        },
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    const logkanal = interaction.options.get('log-kanalı')?.channel
    const cezalıRol: any = await interaction.guild?.roles.fetch(`${interaction.options.get('cezalı-rolü', true)?.role?.id}`)

    if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })
            
    const basarili = new Discord.EmbedBuilder()
    .setColor("Green")
    .setDescription(`${logkanal} **yeni hesap engel** log kanalı olarak ayarlandı,\n${cezalıRol} rolüde cezalı rol olarak ayarlandı.`)

    const pozisyon = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${cezalıRol} benim rolümden yüksekte!\n\n**Sunucu Ayarları** -> __**Roller**__ kısmından rolümü ${cezalıRol} rolünün üzerine sürüklemelisin.`)

if (cezalıRol.position >= cezalıRol.guild.members.me.roles.highest.position) return interaction.followUp({ embeds: [pozisyon], ephemeral: true })

    interaction.followUp({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    db.set(`yeniHesapEngel_${interaction.guild?.id}`, { log: logkanal?.id, rol: cezalıRol.id })

    }
}