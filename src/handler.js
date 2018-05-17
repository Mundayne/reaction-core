class Handler {
  constructor () {
    this.menus = { }
  }

  handle (messageReaction, user) {
    // Remove the reaction
    if (messageReaction.message.client.user !== user) messageReaction.remove(user).catch(console.error)

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

    // An option for only the 'owner' of the menu to react
    if (menu.options.owner && user.id !== menu.owner) return

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
