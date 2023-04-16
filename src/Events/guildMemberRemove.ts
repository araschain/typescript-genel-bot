import { Events } from "../Interfaces";
import { Message, EmbedBuilder, GuildMember, GuildBasedChannel, ChannelType, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } from "discord.js";
import Discord from "discord.js";
import db from "croxydb";
import config from "../config.json";
import { time } from "console";
import Canvas from "canvas";

export const Event : Events = {
    name: "guildMemberRemove",

    async execute(client, member: GuildMember) {
        
        let sayacx: { channel: string } = db.fetch(`sayac_${member.guild.id}`);
        const sayacChannel = member.guild?.channels.cache.get(sayacx.channel)
        if(sayacx) {
        if(sayacChannel && sayacChannel.type === ChannelType.GuildText) {
        
            sayacChannel.send({ embeds: [{ description:  `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi kaldı!`, color: 0x2F3136 }] }).catch(() => {});

        }
    }

    let resimliGiris: { channel: string } = db.fetch(`canvaskanal_${member.guild.id}`);
    const resimliGirisChannel = member.guild?.channels.cache.get(resimliGiris.channel)
    if(resimliGiris) { 

        const canvas = Canvas.createCanvas(648, 387);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1059089831604531243/1067877929016635412/giden.png");

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
  
        const resimliGiris = new AttachmentBuilder(canvas.toBuffer(), { name: 'cikis.png' });

        if(resimliGirisChannel && resimliGirisChannel.type === ChannelType.GuildText) {

            resimliGirisChannel.send({ content: `${member} sunucumuzdan çıktı! Sunucumuz **${member.guild.memberCount}** kişi kaldı.` , files: [resimliGiris] })

            if (member.user.bot) {
                resimliGirisChannel.send(`Bu bir bot, ${member.user.tag}`);
                }
        }
    }

    }
}