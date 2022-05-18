const { MessageAttachment } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')

function makeFlag(arg, msg) {
  let canvas = createCanvas(400, 400)
  let ctx = canvas.getContext('2d')

  let user = msg.mentions.users.first() || msg.author

  let avatar = user.avatarURL({format: 'png'})

  let whichFlag
  if (arg === 'old') {
    whichFlag = 'img/lmap_old.jpg'
  } else if (arg === 'older') {
    whichFlag = 'img/lmap_older.png'
  } else {
    whichFlag = 'img/lmap.png'
  }

  loadImage(avatar).then((image) => { 
    loadImage(whichFlag).then((flag) => {
      ctx.drawImage(image, 0, 0, 400, 400)
      ctx.globalAlpha = 0.5
      ctx.drawImage(flag, 0, 0, 400, 400)

      let attachment = new MessageAttachment(canvas.toBuffer(), 'ave lmap.png')
      msg.channel.send({files: [attachment]})
    })
  }).catch((err) => {
    console.log(err)
  })
}

module.exports.makeFlag = makeFlag