const Discord = require('discord.js')

/**
 * Handles incoming reaction changes, passing them to all appropriate Menus.
 */
class MenuManager {
  /**
   * Creates a new Menumanager.
   */

  constructor () {
    /**
     * A Collection of [Menus]{@link Menu} belonging to this Manager.
     */
    this.Menus = new Discord.Collection()
  }

  /**
   * Registers a new [Menu]{@link Menu} to this Manager.
   *
   * @param  {Menu} menu The Menu to register.
   */
  Register (menu) {
    // Add the Menu to the Manager's collection.
    this.Menus.set(menu.Message.id, menu)
  }

  /**
   * Handles incoming reactions, sending triggers to a Menu if it is the target.
   *
   * @param  {MessageReaction} rxn The ReactionMessage.
   * @param  {User} user The User who reacted.
   */
  Handle (rxn, user) {
    // If the user is a bot, don't handle the reaction.
    if (user.bot) return

    // Store the message reacted to.
    var msg = rxn.message
    // Store the emoji being reacted.
    var emoji = rxn.emoji.toString()

    // Get the Menu that belongs to the message.
    var menu = this.Menus.get(msg.id)
    // If the message has a Menu:
    if (menu) {
      // Get the Button that belongs to the Menu.
      var btn = menu.Buttons.get(emoji)
      // If the Menu has the Button:
      if (btn) {
        // Execute the callback for the Button.
        btn.Callback(user, msg, btn.Data)
      }

      // Remove the reaction.
      rxn.remove(user).catch(console.error)
    }
  }
}
module.exports = MenuManager
