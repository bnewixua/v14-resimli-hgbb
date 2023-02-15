const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "hoşgeldin-sistemi-sıfırla",
    description: "Hoşgeldin sistemini sıfırlarsın.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const data = wixua.get(`hgbb_${interaction.guild.id}`)

        const zaten_yok_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("`❌` | **Hoşgeldin sistemi zaten sıfırlanmış! **")

        if (!data) return interaction.reply({ embeds: [zaten_yok_embed], ephemeral: true })

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`__**Hoşgeldin Sistemi**__ başarıyla sıfırlandı dostum!`)

            wixua.delete(`hgbb_${interaction.guild.id}`)
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};
