import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "ban",
    description: "💙 Kullanıcıyı Sunucudan Yasaklarsın.",
    options: [
        {
            name:"kullanıcı",
            description:"Yasaklanıcak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
        {
            name:"sebep",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
            type:3,
            required:true
        },
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.options.getUser('kullanıcı')
        const sebep = interaction.options.get("sebep")?.value
        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Üyeleri Banla` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("BanMembers")) return interaction.followUp({ embeds: [yetki] })
        
        interaction.guild?.members.ban(`${member?.id}`, { reason: `${sebep}`})

        interaction.followUp(`<:tik:1039607067729727519> | Başarıyla Üyeyi Yasakladım!`)
    }
}