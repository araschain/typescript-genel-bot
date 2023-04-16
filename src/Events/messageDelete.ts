import { Events } from "../Interfaces";
import { Message, EmbedBuilder, GuildMember, GuildBasedChannel, ChannelType, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } from "discord.js";
import Discord from "discord.js";
import db from "croxydb";
import config from "../config.json";
import { time } from "console";
import Canvas from "canvas";

export const Event : Events = {
    name: "messageDelete",

    async execute(client, message: Message) {
        
        let MessageLog: { channel: string } = db.fetch(`mesajLog_${message.guild?.id}`);
        const MessageLogChannel = message.guild?.channels.cache.get(MessageLog.channel)
        if(MessageLog) {
        if(MessageLogChannel && MessageLogChannel.type === ChannelType.GuildText) {
            let me = client.user?.id
            if (!message.author?.bot) {
                if (!message.author) return;
                if (message.author.id !== me) {
    
                    const msg = message.content.slice(0, 1020);
    
                    const messageDelete = new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`Mesaj ${message.channel || "kanal bulunamadı"} adlı kanalda silindi`)
                        .addFields(
                            { name: "Atıldığı Zaman:", value: "<t:" + Math.floor(Date.now() / 1000) + ":F>" },
                            { name: `Kullanıcı:`, value: `<@!${message.author.id || "üye bulunamadı"}> (${message.author.id || "üye bulunamadı"})` },
                            { name: `Silinen Mesaj:`, value: `\`${msg || "Mesaj bulunamadı"}\`` }
                        )
                        .setTimestamp()
    
                    MessageLogChannel.send({ embeds: [messageDelete] }).catch(e => { })
                } else {
                    return;
                }
            }
        }
    }
    }
}