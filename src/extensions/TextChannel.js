const Discord = require('discord.js')
const Menu = require('../menu')

Discord.TextChannel.prototype.sendMenu = async function (menu) {
  return new Promise((resolve, reject) => {
    if (menu instanceof Menu) {
      let sendMessage = { }
      if (typeof menu.text === 'string') {
        sendMessage = menu.text
      } else {
        sendMessage = { embed: menu.text }
      }
      this.send(sendMessage).then(async message => {
        for (let button in menu.buttons) {
          await message.react(button).catch(console.error)
        }
        menu.register(message)
        resolve(message)
      })
    } else this.send(menu).then(message => resolve(message))
  })
}
