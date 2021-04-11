const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')

const VERSION = 'v1.1.0'

client.on('ready', () => {
  console.log(`⚡ lmap flag bot ${VERSION} works as a swiss watch`)
  console.log('⚡ pwrd by vnllpe')
  console.log(`✔️ logged in as ${client.user.tag}`)
})

client.on('message', msg => {
  let text = msg.content.toLowerCase().replace('ё', 'е')
  let textOriginal = msg.content

  let authorPing = `<@!${msg.author.id.toString()}>`
  let authorTag = msg.author.tag
  let authorUsername = msg.author.username
  let authorColor = msg.member.displayHexColor
  let authorAvatar = msg.author.displayAvatarURL({format: 'png'})

  let getGuild = client.guilds.cache.get(msg.guild.id)

  if (!msg.author.bot) {
    if (text.startsWith('l flag ')) {
      let splitMessage = text.split(' ')
      let userPing = splitMessage[2]
      let userId = userPing.slice(3, -1)

      let canvas = createCanvas(400, 400)
      let ctx = canvas.getContext('2d')

      getGuild.members.fetch(userId).then(member => {
        let avatar = member.user.displayAvatarURL({format: 'png'})

        loadImage(avatar).then((image) => {
          loadImage('img/lmap.jpg').then((flag) => {
            ctx.drawImage(image, 0, 0, 400, 400)
            ctx.globalAlpha = 0.5
            ctx.drawImage(flag, 0, 0, 400, 400)

            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ave lmap.png')
            msg.channel.send(attachment)
          })
        }).catch((err) => {
          console.log(err)
        })
      })
    } else if (text === 'l flag') {
      let canvas = createCanvas(400, 400)
      let ctx = canvas.getContext('2d')

      loadImage(authorAvatar).then((image) => {
        loadImage('img/lmap.jpg').then((flag) => {
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
  }
})

client.login(config.token)