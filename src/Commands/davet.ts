import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "davet",
    description: "💙 Botun davet linkini atar.",

    async execute(client, interaction) {
        await interaction.deferReply();

        interaction.followUp({ embeds: [
            new EmbedBuilder()
            .setAuthor({ name: "Merhaba, Ben Silex!" })
            .setColor("#2F3136")
            .setTitle("Silex'e destek ver.")
            .setDescription("> <:bot:1039607042291269703> | Silex'i şimdi sunucuna davet et ve botun tadını çıkar!")
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                    .setLabel(`Davet Linkim`)
                    .setEmoji("1044325557615202364")
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=1038372156578480199&permissions=347200&scope=applications.commands%20bot'),
                    new ButtonBuilder()
                    .setLabel(`Destek Sunucum`)
                    .setEmoji("1039607057923461181")
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/ZtnpBbSDZz')
                )
            ]})
    }
}