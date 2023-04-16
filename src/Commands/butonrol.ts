import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "buton-rol",
    description: "💙 Rol alma sistemini ayarlarsın!",
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
        {
            type: 3,
            name: "yazı",
            description: "Lütfen bir embed mesaj yazısı gir!",
            required: true
        }
    ],

    async execute(client, interaction) {
        await interaction.deferReply(); 

        const rol = interaction.options.get("rol")?.role
        const yazı = interaction.options.get("yazı")?.value

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Rolleri Yönet` yetkisine sahip olmalısın!")

      if (!interaction.memberPermissions?.has("ManageRoles")) return interaction.followUp({ embeds: [yetki] })

        interaction.followUp({ embeds: [
            new EmbedBuilder()
            .setTitle(`Silex - Buton Rol Al Sistemi!`)
            .setDescription(`${yazı}`)
            .setColor("Blue")
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                    .setLabel(rol?.name ?? "Bilinmiyor.")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`rol`)
                )
            ]})
            db.set(`buton_rol_${interaction.guild?.id}`, {
                rol:  rol?.id
            })
    }
}