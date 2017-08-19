const Discord = require('discord.js')
const Manager = require('./MenuManager')

class MenuClient extends Discord.Client {
  constructor () {
    super()
    this.MenuManager = new Manager()

    this.on('messageReactionAdd', (rxn, user) => {
      this.MenuManager.Handle(rxn, user)
    })
  }
}
module.exports = MenuClient
