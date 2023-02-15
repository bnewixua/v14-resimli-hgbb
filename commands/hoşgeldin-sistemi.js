const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const wixua = require("croxydb");
module.exports = {
  name: "hoşgeldin-sistemi",
  description: "hoşgeldin sistemini açar",
  type: 1,
  options: [],
  run: async (client, interaction) => {

    const kanal = interaction.options.getChannel('kanal')

    const row2 = new ActionRowBuilder()
    .addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('hoşgeldin_kanal_set')
            .setPlaceholder("📺 Ayarlanacak kanalı seç.")
    )
    const embed = new EmbedBuilder()
    .setDescription("> **Aşşağıdaki menüden hoşgeldin kanalını kanalını ayarlayabilirsiniz.** 🛎️")

            interaction.reply({embeds: [embed], components: [row2]})

const hgbb = wixua.fetch(`hgbb_`+interaction.guild.id)
//dur unuttum amk sorry //bu neden inmiyo lan :D
if(hgbb) {
    const channel = await interaction.guild.channels.cache.find(channel => channel.id === hgbb);

    

    const member = interaction.member
  
    const canvas = Canvas.createCanvas(648, 387);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/1059089831604531243/1067877929251508376/gelen.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#3c3c3c";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.tag}`, 320, 300);

    if(member.displayAvatarURL().endsWith(".webp") ) {
        var avatar1 = member.displayAvatarURL()
        
        img = await Canvas.loadImage(avatar1.replace("webp", "jpg")); 
      } else {
        img = await Canvas.loadImage(member.displayAvatarURL({ format: "jpg", size: 1024 })); 
      }
  
    let boyut = 85, x = 325.5, y = 161;
    ctx.beginPath();
    ctx.arc(x, y, boyut, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(img, (x - boyut), (y - boyut), (boyut * 2), (boyut * 2));
  
    const canvasgiris = new AttachmentBuilder(await canvas.encode('png'), { name: `hgbb-${interaction.user.id}.png` });
  
    channel.send({content: `${member}`, files: [canvasgiris]});
    if (member.user.bot) {
      return channel.send(`Bu bir bot, ${member.user.tag}`);
    }
}
  }

}