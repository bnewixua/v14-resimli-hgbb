const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const wixua = require("croxydb");

module.exports = async (client, member) => {

    const hgbb = wixua.fetch(`hgbb_`+member.guild.id)

if(hgbb) {
    const channel = await member.guild.channels.cache.find(channel => channel.id === hgbb);
  
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
  
    const canvasgiris = new AttachmentBuilder(await canvas.encode('png'), { name: `hgbb-${member.user.id}.png` });
  
    channel.send({content: `${member} Sunucuya katıldı`, files: [canvasgiris]});
    if (member.user.bot) {
      return channel.send(`Bu bir bot, <@${member.user.id}>`);
    }
}

};
