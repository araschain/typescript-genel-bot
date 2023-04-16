import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "kick",
    description: '💙 Kullanıcıyı Sunucudan Atarsın.',
    options: [
        {
            name:"kullanıcı",
            description:"Yasaklanıcak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.options.getUser('kullanıcı')

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Üyeleri At` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("KickMembers")) return interaction.followUp({ embeds: [yetki] })
        
        interaction.guild?.members.kick(`${member?.id}`)

        interaction.followUp(`<:tik:1039607067729727519> | Başarıyla Üyeyi Attım!`)
    }
}