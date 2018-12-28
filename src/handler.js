class Handler {
  constructor () {
    this.menus = { }
    this.users = [ ]
  }

  handle (messageReaction, user) {
    // Bots aren't handled
    if (user.bot) return

    // The message reacted to and the emoji reacted with
    let message = messageReaction.message
    // Custom emoji have an id field; regular have null
    let emoji = messageReaction.emoji.id || messageReaction.emoji

    // Find the menu, if any exists
    let menu = this.menus[message.id]
    // If there's no menu, stop
    if (!menu) return

    // Remove the reaction
    if (!menu.options.keep && messageReaction.message.client.user !== user) messageReaction.remove(user).catch(console.error)

    // An option for only the 'owner' of the menu to react
    if (menu.options.owner && user.id !== menu.options.owner) return
    // An option for 'slowmode'
    if (menu.options.slowmode > 0) {
      if (this.users.indexOf(user.id) > -1) return
      else {
        this.users.push(user.id)
        let self = this
        setTimeout(() => self.users.splice(self.users.indexOf(user.id), 1), menu.options.slowmode)
      }
    }

    // Find and execute the button, if any
    let button = menu.buttons[emoji]
    if (!button) return
    button.run(user, message)
  }

  addMenus (...menus) {
    menus.forEach(menu => {
      menu.handler = this
    })
  }

  removeMenu (id) {
    delete this.menus[id]
  }
}
module.exports = Handler
