const { MessageEmbed } = require('discord.js')
const { getRandomFromArray } = require('../functions/random.js')

const { aboba } = require('./sendBbCommandAttachments/aboba.js')
const { bigbeaks } = require('./sendBbCommandAttachments/bigbeaks.js')
const { buses } = require('./sendBbCommandAttachments/buses.js')
const { monkes } = require('./sendBbCommandAttachments/monkes.js')
const { smellynugget } = require('./sendBbCommandAttachments/smellynugget.js')
const { toyota } = require('./sendBbCommandAttachments/toyota.js')
const { vnllpe } = require('./sendBbCommandAttachments/vnllpe.js')

function sendBbCommand(arg, authorColor, authorUsername, authorAvatar, msg) {
  let choosen

  if (arg === 'bigbeak') choosen = getRandomFromArray(bigbeaks)
  if (arg === 'bus') choosen = getRandomFromArray(buses)
  if (arg === 'toyota') choosen = getRandomFromArray(toyota)
  if (arg === 'smellynugget') choosen = getRandomFromArray(smellynugget)
  if (arg === 'saxmonke') choosen = getRandomFromArray(monkes)
  if (arg === 'vnllpe') choosen = getRandomFromArray(vnllpe)
  if (arg === 'aboba') choosen = getRandomFromArray(aboba)

  let embed = new MessageEmbed()
                    .setColor(`0x${authorColor}`)
                    .setTitle('<:Ass:835233982554832966> Click me!')
                    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    .setImage(choosen)
                    .setTimestamp()
                    .setFooter({text: `Requested by ${authorUsername}`, iconURL: authorAvatar})

  msg.channel.send({embeds: [embed]})
}

module.exports.sendBbCommand = sendBbCommand