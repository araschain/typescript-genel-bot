import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, GuildTextBasedChannel } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "kanal-aç",
    description: "💙 Kanalı mesaj gönderimine açar!",
    options: [],

    async execute(client, interaction) {
        await interaction.deferReply();

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })

interaction.followUp({ embeds: [new EmbedBuilder()
    .setAuthor({ name: "Merhaba, Ben Silex!" })
    .setColor("#2F3136")
    .setDescription("> Aşağıdaki butona basarak kanala mesaj yazılmasını açabilirsin.")],
    components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setLabel(`Kanalı aç.`)
            .setCustomId(`kanalac`)
            .setStyle(ButtonStyle.Secondary)
        )
    ] })

    }
};