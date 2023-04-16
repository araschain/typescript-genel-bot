import { Events } from "../Interfaces";
import { Message, EmbedBuilder, GuildMember, GuildBasedChannel, ChannelType, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } from "discord.js";
import Discord from "discord.js";
import db from "croxydb";
import config from "../config.json";
import { time } from "console";
import Canvas from "canvas";

export const Event : Events = {
    name: "guildMemberAdd",

    async execute(client, member: GuildMember) {
        
        let sayacx: { channel: string } = db.fetch(`sayac_${member.guild.id}`);
        const sayacChannel = member.guild?.channels.cache.get(sayacx.channel)
        if(sayacx) {
        if(sayacChannel && sayacChannel.type === ChannelType.GuildText) {
        
            sayacChannel.send({ embeds: [{ description:  `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`, color: 0x2F3136 }] }).catch(() => {});

        }
    }

        let resimliGiris: { channel: string } = db.fetch(`canvaskanal_${member.guild.id}`);
        const resimliGirisChannel = member.guild?.channels.cache.get(resimliGiris.channel)
        if(resimliGiris) { 

            const canvas = Canvas.createCanvas(648, 387);
            const ctx = canvas.getContext("2d");

            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1059089831604531243/1067877929251508376/gelen.png");

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#3c3c3c";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = `#D3D3D3`;
            ctx.font = `37px "Warsaw"`;
            ctx.textAlign = "center";
            ctx.fillText(`${member.user.tag}`, 320, 300);

            var avatar1 = member.displayAvatarURL()
            let avatarURL: string | any = await Canvas.loadImage(avatar1.replace("webp", "jpg"));      

            let boyut = 85, x = 325.5, y = 161;
            ctx.beginPath();
            ctx.arc(x, y, boyut, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.drawImage(avatarURL, (x - boyut), (y - boyut), (boyut * 2), (boyut * 2));
      
            const resimliGiris = new AttachmentBuilder(canvas.toBuffer(), { name: 'giris.png' });

            if(resimliGirisChannel && resimliGirisChannel.type === ChannelType.GuildText) {

                resimliGirisChannel.send({ content: `${member} sunucumuza hoşgeldin! Sunucumuz **${member.guild.memberCount}** kişi oldu.`, files: [resimliGiris] })

                if (member.user.bot) {
                    resimliGirisChannel.send(`Bu bir bot, ${member.user.tag}`);
                    }
            }
        }

        const yeniHesap = db.get(`yeniHesapEngel_${member.guild.id}`)
        let yeniHesapx: { log: string } = db.get(`yeniHesapEngel_${member.guild.id}`)

        if (yeniHesap && yeniHesapx) {
            let logKanal = member.guild?.channels.cache.get(yeniHesapx.log)
            if (!logKanal) return;
            let cezalıRol = yeniHesap.rol
            if (!cezalıRol) return;
    
            let role: any = member.guild.roles.cache.get(cezalıRol)
    
            await member.roles.add(role).catch(l => {
    
                const rolEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Cezalı rolü bulunamadığı için **sistem sıfırlandı.**")
    
                    if(logKanal && logKanal.type === ChannelType.GuildText) {

                        logKanal.send({ embeds: [rolEmbed] })
        
                    }

                db.delete(`yeniHesapEngel_${member.guild.id}`, true)
                return;
            })
    
            if (role) {
                const now = new Date().getTime() - (await client.users.fetch(member.id)).createdAt.getTime() < 1296000000
    
                if (now) {
    
                    if (!logKanal) {
                        db.delete(`yeniHesapEngel_${member.guild.id}`, true)
                        return;
                    }
    
                    await member.roles.add(role)
    
                    const logEmbed = new EmbedBuilder()
                        .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                        .setDescription(`${member} adlı kullanıcı yeni hesap olduğu için cezalı rolü verildi.`)
                        .setTimestamp()
                        .setColor("Red")
    
                        if(logKanal && logKanal.type === ChannelType.GuildText) {

                            logKanal.send({ embeds: [logEmbed] })
            
                        }

                }
            }
        };

    }
}