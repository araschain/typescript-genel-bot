import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "yardım",
    description: "💙 Botun yardım menüsüne bakarsın!",
    options: [],

    async execute(client, interaction) {
        await interaction.deferReply(); 

        return interaction.followUp({
            embeds: [
                new EmbedBuilder()
                .setColor("Blue")
                .setTitle("・Hangi komutlarım hakkında bilgi almak istiyorsan o butona bas!")
                .setFooter({ text: `Silex Yardım Menüsü`, iconURL: `${client.user?.avatarURL()}` })
                .setDescription("\n\n**<:links:1039607057923461181> Linkler**\n> <:bot:1039607042291269703>・**Botun davet linki: [Tıkla](https://discord.com/api/oauth2/authorize?client_id=1038372156578480199&permissions=8&scope=bot%20applications.commands)**\n> <:duyuru:1039607050734403657>・**Botun destek sunucusu: [Tıkla](https://discord.gg/SY7aMsVpUJ)**\n> <:newmember:1044325552007422052>・**Botun gizlilik politikası: [Tıkla](https://github.com/araschain/Silex-Bot-Privacy-Policy)**")
                .setThumbnail(interaction.user.avatarURL())
            ],
        });
    }
}