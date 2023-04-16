import { Events } from "../Interfaces";
import { Message, EmbedBuilder, PermissionsBitField, GuildTextBasedChannel, ChannelType } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import config from "../config.json";
import { time } from "console";

export const Event : Events = {
    name: "messageCreate",

    async execute(client, message: Message) {
        
        if (db.fetch(`afk_${message.author.id}`)) {
            
            interface IAFK {
                afkDate: number,
                sebep: string
            }

        const afkDate: IAFK = db.fetch(`afkDate_${message.author.id}`)
            const sebep: IAFK  = db.fetch(`afk_${message.author.id}`)
            
            if (afkDate && sebep) {
                const date = new EmbedBuilder()
                .setDescription(`${message.author} Hoş geldin! **${sebep.sebep}** sebebiyle <t:${parseInt(`${afkDate.afkDate / 1000}`)}:R> afk'ydın`)
                db.delete(`afk_${message.author.id}`, true)
                db.delete(`afkDate_${message.author.id}`, true)
            
            return message.reply({ embeds: [date] })
            }
        
             }

             var kullanıcı = message.mentions.users.first();
             interface AFKSEBEP {
                sebep: string
             }
             if (kullanıcı) {
           
             const sebep: AFKSEBEP = db.fetch(`afk_${kullanıcı.id}`)
           
             if (sebep) {
               const sebeps = new EmbedBuilder()
               .setDescription(`<:soru:1039607065045385256> | Etiketlediğin kullanıcı **${sebep.sebep}** sebebiyle afk modunda!`)
               message.reply({ embeds: [sebeps] });
             }
           }

             if (message.content.length > 4) {
                if (db.fetch(`capslockengel_${message.guild?.id}`)) {
                  let caps = message.content.toUpperCase()
                  if (message.content == caps) {
                   if (!message.member?.permissions.has("Administrator")) {
                      if (!message.mentions.users.first()) {
                       message.delete()
                        const embed = new EmbedBuilder()
                        .setTitle(`<:uyari:1040649846400499712> **UYARI!**`)
                        .setDescription(`✋ | ${message.author}, Bu sunucuda büyük harf kullanımı engelleniyor!`)
                        .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()})
                        .setTimestamp()
                        message.channel.send({embeds: [embed]}).then((msg) => setTimeout(() => { msg.delete() }, 3000))
            }
           }
            }
          }
         }

         let kanal = db.get(`görselengel.${message.guild?.id}`);
         if(message.channel.id == kanal){
           if(!message.attachments.first()){
       
             if(message.member?.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
             if(message.author?.bot) return;
             message.delete()
             const embed = new EmbedBuilder()
             .setColor("Random")
             .setDescription(`${message.author}, Bu Kanalda Sadece GIF & Resim Atabilirsiniz.`)
             .setFooter({text: message.author.tag+" UYARI!", iconURL: message.author.displayAvatarURL()})
             .setTimestamp()
             message.channel.send({embeds: [embed]}).then((msg) => setTimeout(() => { msg.delete() }, 3000))
       
           };
         
         };

         let kufur = db.fetch(`kufurengel_${message.guild?.id}`)
    
         if(kufur) {
         const kufurler = [
           
           "amk",
           "piç",
           "yarrak",
           "oç",
           "göt",
           "amq",
           "yavşak",
           "amcık",
           "amcı",
           "orospu",
           "sikim",
           "sikeyim",
           "aq", 
           "mk"
              
         ]
         
       if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
           if(message.member?.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
           if(message.author?.bot) return;
     
       message.delete()
       message.channel.send(`<:carpi:1040649840394260510> | Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `).then((msg) => setTimeout(() => { msg.delete() }, 5000))
       }
       }

       const data = db.fetch(`yasaklı_kelime_${message.guild?.id}`)
       if(data) {
       if(message.member?.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
       if(message.author?.bot) return;
       if(data.includes(message.content)) {
       message.delete()
       const embed = new EmbedBuilder()
       .setTitle(`<:uyari:1040649846400499712> **UYARI!**`)
       .setDescription(`✋ | ${message.author}, Bu sunucuda bu kelime yasak!`)
       .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()})
       .setTimestamp()
       message.channel.send({ embeds: [embed] }).then((msg) => setTimeout(() => { msg.delete() }, 5000))
       }
     }

    }
}