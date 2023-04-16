import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, GuildMember, Guild } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name:"kullanıcı-bilgi",
    description: '💙 Kullanıcı bilgisine bakarsın.',
    options: [
      {
        name:"kullanıcı",
        description:"Bilgisine bakmak istediğin kullanıcı etiketle!",
        type:6,
        required:true
    },
    ],

    async execute(client, interaction) {
        await interaction.deferReply();

        const member = interaction.options.get("kullanıcı")?.member as GuildMember

        const embed = new EmbedBuilder()
    .setDescription(`**➥ Kullanıcı Bilgileri**
            
    • Kullanıcı: (<@${member?.id}> - \`${member?.id}\`)
    • Hesap Kurulum Tarihi: <t:${parseInt(`${(member.user.createdTimestamp || 1000) / 1000}`)}:R>
    • Sunucuya Katılma Tarihi: <t:${parseInt(`${(member.joinedTimestamp || 1000) / 1000}`)}:R>
    `)
    .setThumbnail(`${member?.displayAvatarURL()}`)
    .setColor("Random")
    interaction.followUp({embeds: [embed]})
    }
}