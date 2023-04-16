import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "destek-sistemi",
    description: "💙 Destek sistemini ayarlarsın!",
    options: [
        {
            name: "kanal",
            description: "Destek mesajının atılacağı kanalı ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "log-kanalı",
            description: "Destek kapatıldığında mesaj atılacacak kanalı ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "yetkili-rol",
            description: "Destek yetkilisini ayarlarsın!",
            type: 8,
            required: true,
        },
    ],

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    const ticketkanal = interaction.options.get('kanal')?.channel
    const logkanal = interaction.options.get('log-kanalı')?.channel
    const rol = interaction.options.get('yetkili-rol')?.role

    if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })

    const ticketSystem = db.fetch(`ticketSystem_${interaction.guild?.id}`)
    const ticketSystemDate: IAFK = db.fetch(`ticketSystemDate_${interaction.guild?.id}`)
            
    interface IAFK {
        date: number
    }
    
    if (ticketSystem && ticketSystemDate) {

        const date = new EmbedBuilder()
        .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(`${ticketSystemDate.date / 1000}`)}:R> önce açılmış!`)
    
    return interaction.followUp({ embeds: [date] })
    }

    const category = await interaction.guild?.channels.create({
        name: 'Destek Talepleri',
        type: Discord.ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: interaction.guild?.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });    

    const basarili = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`<:tik:1039607067729727519> | __**Destek Sistemi**__ başarıyla ayarlandı!\n\n<:kanal:1040649841996464139> Destek Kanalı: ${ticketkanal}\n<:kanal:1040649841996464139> Log Kanalı: ${logkanal}\n<:bot:1039607042291269703> Yetkili Rolü: ${rol}`)
        db.set(`ticketKanal_${interaction.guild?.id}`, logkanal?.id)
        db.set(`ticketSystem_${interaction.guild?.id}`, { yetkili: rol?.id, ticketchannel: ticketkanal?.id })
        db.set(`ticketCategory_${interaction.guild?.id}`, { category:  category?.id, log: logkanal?.id });
        db.set(`ticketSystemDate_${interaction.guild?.id}`, { date: Date.now() })

        const menu = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("<:soru:1039607065045385256> | Destek talebi nasıl açabilirim?")
        .setDescription("> Aşağıdaki **Destek Talebi Oluştur** butonuna basarak destek talebi oluşturabilirsin!")
        .setFooter({ text: "Silex" })

        const channelDB: IAFK = db.fetch(`ticketSystem_${interaction.guild?.id}`);
        const channel = interaction.guild?.channels.cache.get(channelDB.ticketchannel)

            
        interface IAFK {
            ticketchannel: string
        }
        if(channel && channel.type === ChannelType.GuildText) {
        
            channel.send({embeds: [menu], components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new Discord.ButtonBuilder()
                    .setEmoji("1044325577064190033")
                    .setLabel("Destek Talebi Oluştur")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ticketolustur"),
                new Discord.ButtonBuilder()
                    .setEmoji("1039607065045385256")
                    .setLabel("Nasıl oluşturabilirim?")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ticketnasilacilir")
                )
            ]})

        }
    return interaction.followUp({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }
}