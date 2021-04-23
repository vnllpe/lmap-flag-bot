const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')

const VERSION = 'v1.4.0'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomFromArray(arr) {
  return arr[getRandomInt(arr.length)];
}

function makeFlag(arg, msg) {
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
  let authorAvatar = msg.author.displayAvatarURL({dynamic: true})

  let getGuild = client.guilds.cache.get(msg.guild.id)

  if (!msg.author.bot) {
    if (prefix === 'l' || prefix === 'i') {
      if (command.startsWith('flag')) {
        makeFlag('new', msg)
      } else if (command.startsWith('oldflag')) {
        makeFlag('old', msg)
      } else if (command === 'help' || command === 'commands') {
        let embed = new Discord.MessageEmbed()
                               .setColor(`0x002d70`)
                               .setTitle('i have only two commands:')
                               .setDescription('• l flag\n• l oldflag')

        msg.channel.send(embed)
      }
    }

    if (text === 'bbbigbeak' || text === 'bbbigbonk' || text === 'bbbigbruh') {
      let bigbeaks = ['https://cdn.discordapp.com/attachments/828678818960375810/835267239691157514/rfgm9eyp8o421-1.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835267239913062420/w-yUrvd9HiM.jpg',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835267240093548594/iLSp_sDvIPY.jpg',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835267240340750386/8Pm_qgTumfM.jpg',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835267240596078602/RMsdwOYnK0E.jpg',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835267241440182332/talkman-4e264b87d60a7.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835269605374033940/maxwell_s_emoticons_by_ianmata1998_dcjnqy1-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835269762913140776/E3199E43D5EB95189B3754F7A45A75F52031EFC7.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835269851509030922/maxwell_by_ianmata1998_dc4ljx3-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835269935142797333/maxwell_in_the_city_by_ianmata1998_dc6alxx-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270028936216576/8CF34F1275D51672CE8975D76625A4D807FD7EE6.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270162101567508/sleepy_maxwell_by_ianmata1998_dcjnrro-250t.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270254606286898/maxwell_founds_a_book_in_the_middle_of_the_street_by_ianmata1998_dc6al63-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270344603598898/maxwell_plays_the_pikopiko_by_ianmata1998_dcjns4i-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270368461062205/maxwell_in_home_by_ianmata1998_dc7f4m0-fullview.png',
                      'https://cdn.discordapp.com/attachments/828678818960375810/835270396978004018/maxwell_feels_embarrassing_by_ianmata1998_dc6akch-fullview.png']

      let choosenBigbeak = getRandomFromArray(bigbeaks)

      let embed = new Discord.MessageEmbed()
                             .setColor(`0x${authorColor}`)
                             .setTitle('<:Ass:835233982554832966> Click me!')
                             .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                             .setImage(choosenBigbeak)
                             .setTimestamp()
	                           .setFooter(`Requested by ${authorUsername}`, authorAvatar)

      msg.channel.send(embed)
    }
  }
})

client.login(config.token)
