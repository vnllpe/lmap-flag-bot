const { MessageEmbed } = require("discord.js")

function sayingOWord(msg, authorPing, authorUsername) {
  let description = `\
${authorPing} you've been timed out for 3 minutes for saying the o-word!

next time don't forget the only rule of this server: ***the most important rule is to NOT use "lmao" because this is LMAP server. Therefore lmap>lmao***
`
  let embed = new MessageEmbed()
    .setColor(`0xff0000`)
    .setTitle(`:warning::warning::warning: ${authorUsername} just said the o-word!`)
    .setDescription(description)

  try {
    msg.member.timeout(3 * 60 * 1000, 'saying o-word')
  } catch {
    return
  }

  try { 
    msg.reply({embeds: [embed]})
  } catch { 
    msg.channel.send(authorPing, {embeds: [embed]}) 
  }
}

module.exports.sayingOWord = sayingOWord