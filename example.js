/*
* ========================================
* An example for the use of reaction-core.
* This example changes the colour of an embed based on the button you click.
* Support server: http://mundane.tk/discord
* ========================================
*/

const RC = require('./index')
const discord = require('discord.js')
const client = new discord.Client()

// Handles all menus created
const handler = new RC.Handler()

// Handle menu button presses
client.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))

// An example set of data; moved to extra file so that only the specific code for creating a menu is in here.
const example = require('./exButtons')

let changeColour = new RC.Menu(example.embed, example.buttons)
handler.addMenus(changeColour)

client.on('message', async message => {
  if (message.author.bot) return
  if (message.content === 'rc!test') {
    message.channel.sendMenu(changeColour)
  }
})

client.login('bot-token-here')
