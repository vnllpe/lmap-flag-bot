const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')

const VERSION = 'v1.3.1'

function makeFlag(arg, text, msg) {
  let canvas = createCanvas(400, 400)
  let ctx = canvas.getContext('2d')

  let user = msg.mentions.users.first() || msg.author

  let avatar = user.avatarURL({format: 'png'})

  let whichFlag
  if (arg === 'old') {
    whichFlag = 'img/lmap_old.png'
  } else {
    whichFlag = 'img/lmap.jpg'
  }

  loadImage(avatar).then((image) => { 
    loadImage(whichFlag).then((flag) => {
      ctx.drawImage(image, 0, 0, 400, 400)
      ctx.globalAlpha = 0.5
      ctx.drawImage(flag, 0, 0, 400, 400)

      let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ave lmap.png')
      msg.channel.send(attachment)
    })
  }).catch((err) => {
    console.log(err)
  })
}

client.on('ready', () => {
  console.log(`⚡ lmap flag bot ${VERSION} works as a swiss watch`)
  console.log('⚡ pwrd by vnllpe')
  console.log(`✔️ logged in as ${client.user.tag}`)
})

client.on('message', msg => {
  let text = msg.content.toLowerCase().replace('ё', 'е')
  let textOriginal = msg.content

  let prefix = text[0]
  let command = text.slice(2)

  let authorPing = `<@!${msg.author.id.toString()}>`
  let authorTag = msg.author.tag
  let authorUsername = msg.author.username
  let authorColor = msg.member.displayHexColor
  let authorAvatar = msg.author.displayAvatarURL({format: 'png'})

  let getGuild = client.guilds.cache.get(msg.guild.id)

  if (!msg.author.bot) {
    if (prefix === 'l' || prefix === 'i') {
      if (command.startsWith('flag')) {
        makeFlag('new', text, msg)
      } else if (command.startsWith('oldflag')) {
        makeFlag('old', text, msg)
      } else if (command === 'help' || command === 'commands') {
        let embed = new Discord.MessageEmbed()
                               .setColor(`0x002d70`)
                               .setTitle('i have only two commands:')
                               .setDescription('• l flag\n• l oldflag');

        msg.channel.send(embed)
      }
    }
  }
})

client.login(config.token)
