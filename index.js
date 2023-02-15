const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const wixua = require("croxydb")
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[BOT] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)


client.on('interactionCreate', async (interaction) => {

  if(interaction.customId === "hoşgeldin_kanal_set") {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    
    let channel = interaction.values[0]
        wixua.set(`hgbb_${interaction.guild.id}`, channel)

        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("<:icon_settings:1074653831851417671>")
                .setStyle(2)
                .setCustomId("ayarlar2")
        )


        let data = wixua.get(`hgbb_${interaction.guild.id}`)
        if(!data) return interaction.reply({content: "Bir hata oluştu", ephemeral: true })
  
        const sistem_kapali = new EmbedBuilder()
        .setDescription("> **Hoşgeldin sistemi başarıyla ayarlandı** 🛎️")
          .setFooter({ text: "Sistemi sıfırlamak için /hoşgeldin-sistemi-sıfırla komudunu kullanabilirsin!" })


        return interaction.update({ content: "", embeds: [sistem_kapali], components: [row1] })
  }
})