import Discord  from "discord.js";
import db from "croxydb";
import { Commands } from "../Interfaces";

export const Command : Commands = {
    name: "yasaklı-kelime",
    description: "💙 Yasaklı kelime sistemini ayarlarsın!",
    options: [
        {
            type: 3,
            name: "kelime",
            description: "1 adet kelime giriniz.",
            required: true
        }
    ],

    async execute(client, interaction) {
        await interaction.deferReply(); 

        const kelime = interaction.options.get("kelime")?.value

        const yetki = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("<:carpi:1040649840394260510> | Bu komutu kullanabilmek için `Rolleri Yönet` yetkisine sahip olmalısın!")

    if (!interaction.memberPermissions?.has("ManageRoles")) return interaction.followUp({ embeds: [yetki] })

        db.push(`yasaklı_kelime_${interaction.guild?.id}`, kelime)

        interaction.followUp("<:tik:1039607067729727519> | Yasaklı kelime ayarlandı.")
    }
}