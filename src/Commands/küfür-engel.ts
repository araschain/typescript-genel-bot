import { ActionRowBuilder, ChannelType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "küfür-engel",
    description: "💙 Küfür Engel Sistemini Açıp Kapatırsın!",
    options: [    
      {
      type: 3,
      name: "seçenek",
      description: "Sistemi kapatacak mısın yoksa açacak mısın?",
      required: true,
      choices: [
        {
          name: "Aç",
          value: "ac"
        },
        {
          name: "Kapat",
          value: "kapat"
        }
      ]
    }
  ],

    async execute(client, interaction) {
      await interaction.deferReply({ ephemeral: true });
        const kufurEngelSystemTrue = interaction.options.get("seçenek")?.value
        const kufurEngelSystem = db.fetch(`kufurengel_${interaction.guild?.id}`)

        switch(kufurEngelSystemTrue) {
            case "ac": {
                interface IAFK {
                    date: number
                }
                const yetki = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")
        
              if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })
              const kufurEngelSystem = db.fetch(`kufurengel_${interaction.guild?.id}`)
              const kufurEngelSystemDate: IAFK = db.fetch(`kufurengelDate_${interaction.guild?.id}`)
              
              if (kufurEngelSystem && kufurEngelSystemDate) {
                  const date = new EmbedBuilder()
                  .setDescription(`<:carpi:1040649840394260510> | Bu sistem <t:${parseInt(`${kufurEngelSystemDate.date / 1000}`)}:R> önce açılmış!`)
              
              return interaction.followUp({ embeds: [date] })
              }
              db.set(`kufurengel_${interaction.guild?.id}`, true)
              db.set(`kufurengelDate_${interaction.guild?.id}`, { date: Date.now() })
              return interaction.followUp({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem açıldı!" });
            }
        
            case "kapat": {
              const yetki = new Discord.EmbedBuilder()
              .setColor("Red")
              .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")
      
            if (!interaction.memberPermissions?.has("Administrator")) return interaction.followUp({ embeds: [yetki] })
              if(!kufurEngelSystem) return interaction.followUp({ content: "<:carpi:1040649840394260510> | Bu sistem zaten kapalı?" });
        
              db.delete(`kufurengel_${interaction.guild?.id}`, true)
              db.delete(`kufurengelDate_${interaction.guild?.id}`, true)
              return interaction.followUp({ content: "<:tik:1039607067729727519> | Başarılı bir şekilde sistem kapatıldı!" });
            }
          }
    }
}