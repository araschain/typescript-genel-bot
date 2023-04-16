import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { codeBlock } from "discord.js";
import { Commands } from "../Interfaces";
import moment from "moment";

export const Command : Commands = {
    name: "istatistik",
    description: "💙 Botun istatistiğini görürsün!",

    async execute(client, interaction) {
        const date : number = Date.now();
        let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
        await interaction.deferReply();

        const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setLabel("Yenile")
        .setEmoji("1039607071093567658")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("yenile")
        )

        interaction.followUp({ embeds: [
            new EmbedBuilder()
            .addFields([
                {
                    name: "Discord API;",
                    value: `${codeBlock("yaml", `${client.ws.ping}ms`)}`,
                    inline: true
                },
                {
                    name: "Mesaj gecikmesi;",
                    value: `${codeBlock("yaml", `${(Date.now() - date).toString()}ms`)}`,
                    inline: true
                },
            ])
            .addFields([
                {
                    name: "Sunucu Sayısı:",
                    value: `${codeBlock("yaml", `${client.guilds.cache.size}`)}`,
                    inline: true
                },
                {
                    name: "Kullanıcı Sayısı;",
                    value: `${codeBlock("yaml", `${members}`)}`,
                    inline: true
                }
            ])
            ],
            components: [row] as any })
    }
}