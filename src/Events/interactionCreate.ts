import { CommandInteraction, EmbedBuilder, codeBlock, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalActionRowComponentBuilder, Role, PermissionsBitField, User, ChannelType, GuildTextChannelResolvable, GuildTextBasedChannel } from "discord.js";
import db from "croxydb";
import Discord from "discord.js";
import { Events } from "../Interfaces";

export const Event : Events = {
    name: "interactionCreate",

    async execute(client, interaction) {
        if(interaction.isChatInputCommand()) {
            const cmd = client.commands.get(interaction.commandName);

            if(cmd) {
                try {
                    cmd.execute(client, interaction)
                } catch (err) {
                    interaction.followUp({ content: "Tebrikler, bir hata buldun! bunu geliştiricilerimize söylesen iyi edersin; https://discord.gg/", ephemeral: true })                 
                }
            }
     }
     if (interaction.isModalSubmit()) {
      if(interaction.customId === 'ticketforms'){
        const ticketSystem = db.fetch(`ticketSystem_${interaction.guild?.id}`)
      
      
        const lvl = db.fetch(`ticketLvl_${interaction.guild?.id}`) || 0;
      
        db.add(`ticketLvl_${interaction.guild?.id}`, 1)
      
      
        const ticketYetkili = await interaction.guild.roles.cache.find((ch: Role)=> ch.id === ticketSystem.yetkili );
      
        const ticketCategory = db.fetch(`ticketCategory_${interaction.guild?.id}`);
      
        const ticketsebep = interaction.fields.getTextInputValue('ticketInput');
       const channel = await interaction.guild.channels.create({
         name: `ticket-${interaction.user.username}-`+lvl,
         type: Discord.ChannelType.GuildText,
         parent: ticketCategory.category,
         permissionOverwrites: [
           {
             id: interaction.guild.id,
             deny: [Discord.PermissionsBitField.Flags.ViewChannel],
           },
            {
             id: interaction.user.id,
             allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
           },
           {
            id: ticketYetkili.id,
            allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
           },
         ],
       });
       const sebepTicket = new Discord.EmbedBuilder()
       .setDescription(`Neden talep açtığını öğrenebilir miyiz?\n> \`${ticketsebep}\``)
       const ticketUserEmbed = new Discord.EmbedBuilder()
       .setAuthor({ name: `${interaction.user.username} | Destek açıldı`, iconURL: `${interaction.user.displayAvatarURL({ dynmaic: true })} ` })
       .setThumbnail(interaction.guild.iconURL({ dynmaic: true }))
       .addFields([ 
        { name: "Destek açan:", value: `${interaction.user}`, inline: true },
        { name: "Açılış zamanı:", value: `<t:${parseInt(`${channel.createdTimestamp / 1000}`)}:R>`, inline: true }
       ])
       .setColor('Green')
       .setFooter({ text: `Oluşturan: ${client.user?.tag}`, iconURL: `${client.user?.avatarURL()}` })
       .setTimestamp()
       
       const row = new Discord.ActionRowBuilder()
       .addComponents(
         new Discord.ButtonBuilder()
           .setCustomId(`ticketClose`)
           .setLabel('Destek kapatılsın.')
           .setEmoji("🔒")
           .setStyle(Discord.ButtonStyle.Secondary),
       );
       
        interaction.reply({ content: `<:tik:1039607067729727519> **|** Senin için bir tane destek kanalı ${channel} oluşturldu.`, ephemeral: true })
      
        db.set(`ticketChannelUser_${interaction.guild?.id}${channel.id}`, { user: interaction.user.id })
        db.set(`ticketUser_${interaction.user.id}${interaction.guild?.id}`, { whOpen: interaction.user.id, date: Date.now() })
      
        channel.send({ content: `<@${interaction.user.id}> | ${ticketYetkili}`, embeds: [ticketUserEmbed] })
        return channel.send({ embeds: [sebepTicket], components: [row]  })
      
      }
     }
    
     if (interaction.isButton()) {

        if(interaction.customId === "rol") {
            const rolelDB: Role = db.fetch(`buton_rol_${interaction.guild?.id}`);
            const role = interaction.guild?.roles.cache.get(rolelDB.rol)
    
                
            interface Role {
                rol: string
            }
            if(!interaction.member.roles.cache.has(role.id)) { 
            interaction.member.roles.add(role.id)
          interaction.reply({content: "<:tik:1039607067729727519> | Rol Başarıyla Verildi!", ephemeral: true})
           } else {
             
            interaction.member.roles.remove(role.id)
          interaction.reply({content: "<:carpi:1040649840394260510> | Rol Başarıyla Alındı!", ephemeral: true})
        }
          }

          if(interaction.customId === "ticketnasilacilir") {
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: "Silex Destek Menüsü", iconURL: `${client.user?.avatarURL()}`})
            .setTitle("・Destek talebi nasıl oluşturabilirsin.")
            .setDescription("**Destek Talebi Oluştur** butonuna tıkladıktan sonra karşına bir form gelecektir. O formu doldurduktan sonra destek talebin başarılı bir şekilde oluşturulacaktır.")
            .setImage(`https://cdn.discordapp.com/attachments/1059089831604531243/1064225401297195058/image.png`)
            .setColor('Blue')
              interaction.reply({ embeds: [embed], ephemeral: true })
          }
        
          if(interaction.customId === `ticketolustur`) {
          
            const find = db.fetch(`ticketUser_${interaction.user?.id}${interaction.guild?.id}`)
            if(find) {
              const ticketVar = new Discord.EmbedBuilder()
              .setDescription(`<:carpi:1040649840394260510> Zaten bir talebin bulunmakta.`)
              return interaction.reply({ embeds: [ticketVar], ephemeral: true })
            }
  
            const ticketmodal = new Discord.ModalBuilder()
            .setCustomId('ticketforms')
            .setTitle('Destek Oluşturma Formu');
      
            const ticketInput = new Discord.TextInputBuilder()
            .setCustomId('ticketInput')
            .setLabel("Destek Oluşturma Sebebiniz Nedir?")
            .setRequired(true)  
            .setStyle(Discord.TextInputStyle.Paragraph);
      
        
            const afirstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(ticketInput);
      
            ticketmodal.addComponents(afirstActionRow);
      
            await interaction.showModal(ticketmodal);
            
          }

          if(interaction.customId === `ticketClose`) {
            interaction.channel.permissionOverwrites.set([
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },        
            ]);
            const row = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId(`ticketDelete`)
                .setLabel('Destek silinsin.')
                .setEmoji("🗑️")
                .setStyle(Discord.ButtonStyle.Secondary),
            );
            const ticketClose = new Discord.EmbedBuilder()
            .setDescription(`<:tik:1039607067729727519> | Bu destek talebi kapatılmıştır.`)
            .setColor('Green')
            interaction.reply({ embeds: [ticketClose], components: [row] })
          }

          if(interaction.customId === `ticketDelete`) {

            const chnl = db.fetch(`ticketChannelUser_${interaction.guild?.id}${interaction.channel?.id}`);
            const x = chnl.user;
            const adam = await interaction.guild.members.cache.find((user: User) => user.id === x);
            const usr = db.fetch(`ticketUser_${x}${interaction.guild?.id}`);
   
             const ticketLog = db.fetch(`ticketKanal_${interaction.guild?.id}`)
             const ticketcloseembed = new EmbedBuilder()
             .setTitle(`${adam.user.tag} adlı kişinin destek verileri.`)
             .addFields(
               { name: "Destek Açan:", value: `<@${usr.whOpen}>`, inline: true },
               { name: "Desteğin Kapatılış Tarihi:", value: `<t:${parseInt(`${Date.now() / 1000}`)}:R>`, inline: true  },
               { name: '\u200B', value: '\u200B' },
               { name: "Desteği Kapatan:", value: `<@${interaction.user?.id}>`, inline: true },
               { name: "Desteğin Açılış Tarihi:", value: `<t:${parseInt(`${usr.date / 1000}`)}:R>`, inline: true  },
                     )
             .setColor('Green')
             .setThumbnail(`${adam.user?.displayAvatarURL()}`)

             const ticketlog: GuildTextBasedChannel = interaction.guild?.channels.cache.get(ticketLog)
          
          if(ticketlog && ticketlog.type === ChannelType.GuildText) {
            ticketlog.send({ embeds: [ticketcloseembed] })
          } else console.log("yok")
          
             db.delete(`ticketChannelUser_${interaction.guild?.id}${interaction.channel?.id}`, true);
             db.delete(`ticketUser_${x}${interaction.guild?.id}`, true);
   
             return interaction.channel.delete();
           }

           if(interaction.customId === `kanalac`) {
            interaction.update({ embeds: [new EmbedBuilder()
              .setAuthor({ name: "Merhaba, Ben Silex!" })
              .setColor("#2F3136")
              .setDescription("> Kanal mesaj gönderimine açıldı!")],
              components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents(
                      new ButtonBuilder()
                      .setLabel(`Kanalı aç.`)
                      .setCustomId(`kanalac`)
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary)
                  )
              ] })
              if(interaction.channel.type === ChannelType.GuildText) {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
            }

           }
           if(interaction.customId === `kanalkapat`) {
            interaction.update({ embeds: [new EmbedBuilder()
              .setAuthor({ name: "Merhaba, Ben Silex!" })
              .setColor("#2F3136")
              .setDescription("> Kanal mesaj gönderimine kapatıldı!")],
              components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents(
                      new ButtonBuilder()
                      .setLabel(`Kanalı kapat.`)
                      .setCustomId(`kanalkapat`)
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary)
                  )
              ] })
              if(interaction.channel.type === ChannelType.GuildText) {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
            }

           }

    }
    },
}