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
    let emoji = messageReaction.emoji
    // If it's a custom emoji, strip it down to just the ID
    if (emoji[0] === '<') emoji = /<:.+:(\d+)/.exec(emoji)[1]

    // Find the menu, if any exists
    let menu = this.menus[message.id]
    // If there's no menu, stop
    if (!menu) return

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
