const { Client, Intents } = require('discord.js')
const { token } = require('./config.json')

const { makeFlag } = require('./commands/makeFlag.js')
const { sendBbCommand } = require('./commands/sendBbCommand.js')
const { sayingOWord } = require('./commands/sayingOWord.js')
const { help } = require('./commands/help.js')

const { version } = require('./package.json')

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
  console.log(`⚡ lmap flag bot ${version} works as a swiss watch`)
  console.log('⚡ pwrd by vnllpe')
  console.log(`✔️ logged in as ${client.user.tag}`)

  client.user.setPresence({activities: [{type: 'WATCHING', name: 'Lmapistan'}] })
})

client.on('messageCreate', msg => {
  let text = msg.content.toLowerCase().replace('ё', 'е')

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
      if (command.startsWith('flag')) makeFlag('new', msg)
      if (command.startsWith('oldflag')) makeFlag('old', msg)
      if (command.startsWith('olderflag')) makeFlag('olderflag', msg)
      if (command === 'help' || command === 'commands') help(msg)
    }

    if (text === 'bbbigbeak' || text === 'bbbigbonk' || text === 'bbbigbruh') sendBbCommand('bigbeak', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbbus') sendBbCommand('bus', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbtoyota') sendBbCommand('toyota', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbsmellynugget') sendBbCommand('smellynugget', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbsaxmonke' || text === 'bbsaxmonkey' || text === 'bbmonke' || text === 'bbmonkey') sendBbCommand('saxmonke', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbvanellope' || text === 'bbvanelope' || text === 'bbpenellope' || text === 'bbpenelope' || text === 'bbvnllpe') sendBbCommand('vnllpe', authorColor, authorUsername, authorAvatar, msg)
    if (text === 'bbaboba') sendBbCommand('aboba', authorColor, authorUsername, authorAvatar, msg)

    if (text.includes('lmao')) sayingOWord(msg, authorPing, authorUsername)
  }
})

client.login(token)
