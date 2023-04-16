import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import Discord from "discord.js";
import db from "croxydb";
import { Commands } from "../Interfaces";
import { type } from "os";

export const Command : Commands = {
    name: "idban",
    description: "💙 ID ile kullanıcı yasaklarsın!",
    options: [
        {
            name:"id",
            description:"Lütfen bir kullanıcı ID girin!",
            type:3,
            required:true
        },
        {
            name:"sebep",
            description:"Lütfen bir sebep belirtin.",
            type:3,
            required:true
        }
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true }); 

        const id = interaction.options.get("id")?.value
        const sebep = interaction.options.get("sebep")?.value

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Üyeleri Banla` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("BanMembers")) return interaction.followUp({ embeds: [yetki] })

    interaction.guild?.members.ban(`${id}`, { reason: `${sebep}`})

    interaction.followUp(`<:tik:1039607067729727519> | Başarıyla Üyeyi Yasakladım!`)
        
    }
}