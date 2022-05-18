const { MessageEmbed } = require("discord.js")

const { version } = require('../package.json')

const description = `\
• l flag
• l oldflag
• l olderflag

• bbaboba
• bbbigbeak
• bbbus
• bbsaxmonke
• bbsmellynugget
• bbtoyota
• bbvanellope

github repo: https://github.com/vnllpe/lmap-flag-bot/
version: ${version}

*with :heart: from vnllpe*
https://vnllpe.me
`

function help(msg) {
  let embed = new MessageEmbed()
                    .setColor(`0x002d70`)
                    .setTitle('so, these are my commands:')
                    .setDescription(description)

  msg.channel.send({embeds: [embed]})
}

module.exports.help = help