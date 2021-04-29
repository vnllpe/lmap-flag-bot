const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const fs = require('fs')
const {createCanvas, loadImage} = require('canvas')

const VERSION = 'v1.7.0'

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

function sendBbCommand(arg, authorColor, authorUsername, authorAvatar, msg) {
  let choosen

  if (arg === 'bigbeak') {
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
                    'https://cdn.discordapp.com/attachments/828678818960375810/835270396978004018/maxwell_feels_embarrassing_by_ianmata1998_dc6akch-fullview.png',]

    choosen = getRandomFromArray(bigbeaks)
  } else if (arg === 'zlol') {
    let zlols = ['https://cdn.discordapp.com/attachments/737691320184995950/836681656118018068/IMG_20210423_230759.jpg',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836682652601024542/IMG_20210427_221715.jpg',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836683665727029280/IMG_20210427_222122.jpg',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836686328539250738/IMG_20190922_112558_1.jpg',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836688502242410506/maxresdefault.png',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836689976019255336/IMG_20210220_120938.jpg',]

    choosen = getRandomFromArray(zlols)
  } else if (arg === 'bus') {
    let buses = ['https://cdn.discordapp.com/attachments/828678818960375810/836691197183524874/Mosbus_2-19-2.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691659147182100/217_h66gzKa.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691687895334962/-gallery6fu.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691734099394591/aa42b6e41b26d72693ec20628166230d.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691754836426832/10231img1.png',
                 'https://cdn.discordapp.com/attachments/836697591856234538/836702534990299206/BRT3.jpg',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691810898149436/yHYra1573751438.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836696343287693322/627458.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836696439392436224/638788.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691825334288424/94b3d5d8a97c499d1e93cca56e9efbdf.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691846033309716/741643b7c519a742_XL.png',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836694261042511912/18-FolkestoneHarbourArm-0791.jpg',
                 'https://cdn.discordapp.com/attachments/737691320184995950/836694437207343165/Athens-bus.jpg',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691880631599144/4503599672748895_4cef.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691946554130482/Route_C2ABD091C2BB_Moscow_bus.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691976303673435/3-1024x683.png',
                 'https://cdn.discordapp.com/attachments/828678818960375810/836691998189682768/Article_170701_860_575.png',]
    
    choosen = getRandomFromArray(buses)
  } else if (arg === 'toyota') {
    let toyota = ['https://cdn.discordapp.com/attachments/828678818960375810/836693284315332623/day-exterior-4_040.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694143404343397/20191105_02_01_s.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694171313373265/Header_Cover_tcm-3022-1887120.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694191660597258/2020_Toyota_Corolla_Cross_-_Front_28cropped29.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694197897134110/2021_toyota_c_hr_angularfront.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694218562469888/854x480_1_tcm-3020-1921376.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694236643983371/2020-toyota-highlander-for-europe.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694262624026694/front-left-side-47.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694290080071740/456x342n.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694309452513310/5fa3b1488a36d.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694324224720936/KMO_152985_07275_1_t218_111143.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694350913601536/17_1920-1080_tcm-3020-2216821.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694576135798834/EmwjAZS7CK8.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694627934928966/L3BXw3GJ8HU.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694646540861530/L9vVqxA1rvw.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836694673032085504/lZpUZEBRyCQ.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695702720479232/2020-gr-supra-2-0l-turbo.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695749068718181/5ed37c3cbb3416a4a392fd8ff6165ca48ba77152.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695777475952690/dda90e84f8818698bab77d8f83d828699dbb4643.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695796161183754/2021-toyota-supra-a91-edition.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695846254542908/t1-1545941659.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695860568916028/toyota-supra-turbo-m.png',
                  'https://cdn.discordapp.com/attachments/828678818960375810/836695895332356096/2021-Toyota-Supra-3-0-1.png']

    choosen = getRandomFromArray(toyota)
  } else if (arg === 'smellynugget') {
    let smellynugget = ['https://cdn.discordapp.com/attachments/737691320184995950/836700501424603156/20210427_002502.jpg']

    choosen = getRandomFromArray(smellynugget)
  } else if (arg === 'saxmonke') {
    let monkes = ['https://cdn.discordapp.com/attachments/837426406701924353/837426653504208958/20210429_233317.jpg',
                  'https://cdn.discordapp.com/attachments/837426406701924353/837426653792829440/20210429_233259.jpg',
                  'https://cdn.discordapp.com/attachments/837426406701924353/837426654044356678/20210429_233249.jpg',
                  'https://cdn.discordapp.com/attachments/837426406701924353/837426654472437801/20210429_233239.jpg',
                  'https://cdn.discordapp.com/attachments/837426406701924353/837426655168823357/20210429_233219.jpg',]

    choosen = getRandomFromArray(monkes)
  }

  let embed = new Discord.MessageEmbed()
                         .setColor(`0x${authorColor}`)
                         .setTitle('<:Ass:835233982554832966> Click me!')
                         .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                         .setImage(choosen)
                         .setTimestamp()
	                       .setFooter(`Requested by ${authorUsername}`, authorAvatar)

  msg.channel.send(embed)
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
                               .setTitle('so, this is my commands:')
                               .setDescription(`• l flag\n• l oldflag\n• bbbigbeak\n• bbbus\n• bbsaxmonke\n• bbsmellynugget\n• bbtoyota\n• bbzlol\n\ngithub repo: https://github.com/vnllpe/lmap-flag-bot/\nversion: ${VERSION}\n\n*with :heart: from vnllpe*`)

        msg.channel.send(embed)
      }
    }

    if (text === 'bbbigbeak' || text === 'bbbigbonk' || text === 'bbbigbruh') {
      sendBbCommand('bigbeak', authorColor, authorUsername, authorAvatar, msg)
    } else if (text === 'bbzlol') {
      sendBbCommand('zlol', authorColor, authorUsername, authorAvatar, msg)
    } else if (text === 'bbbus') {
      sendBbCommand('bus', authorColor, authorUsername, authorAvatar, msg)
    } else if (text === 'bbtoyota') {
      sendBbCommand('toyota', authorColor, authorUsername, authorAvatar, msg)
    } else if (text === 'bbsmellynugget') {
      sendBbCommand('smellynugget', authorColor, authorUsername, authorAvatar, msg)
    } else if (text === 'bbsaxmonke' || text === 'bbsaxmonkey' || text === 'bbmonke' || text === 'bbmonkey') {
      sendBbCommand('saxmonke', authorColor, authorUsername, authorAvatar, msg)
    }
  }
})

client.login(config.token)
