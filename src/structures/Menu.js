const Discord = require('discord.js')

const Button = require('./Button')
const Builder = require('./ButtonBuilder')

/**
 * A Menu belonging to a [MenuMessage]{@link MenuMessage}.
 */
class Menu {
  /**
   * Creates a Menu.
   */

  constructor (client) {
    /**
     * A Collection of [Buttons]{@link Button} belonging to this Menu.
     */
    this.Buttons = new Discord.Collection()
    /**
     * The Message that this Menu has been sent with.
     */
    this.Message
  }

  /**
   * @callback ButtonCallback
   * @param {User} user The User who clicked the Button.
   * @param {Message} message The Message this Menu belongs to.
   * @param {Object} [data=undefined] Optional data to pass to the callback.
   */
  /**
   * Adds a Button to this Menu.
   *
   * @param  {string} emoji The emoji the button is of.
   * @param  {ButtonCallback} callback The callback of the button.
   * @param  {type} data Optional data to pass to the callback.
   */
  AddButton (emoji, callback, data = undefined) {
    if (emoji instanceof Builder) {
      let button = emoji
      this.Buttons.set(button.Emoji, new Button(button.Emoji, button.Callback, button.Data))
    } else {
      // Create a new Button and add it to this Menu's Buttons Collection.
      this.Buttons.set(emoji, new Button(emoji, callback, data))
    }
  }

  /**
   * Displays this Menu's Buttons.
   * @see Button#Draw
   *
   * @param  {Message} m The Message this Menu belongs to.
   */
  Display (m) {
    // Set Message so this Menu knows what it belongs to.
    this.Message = m
    // Register this Menu, as it is now complete and active.
    m.client.MenuManager.Register(this)

    draw(this.Buttons, m)
  }
}
module.exports = Menu

async function draw(buttons, message) {
  for (button of buttons) {
    await button[1].Draw(message)
  }
}
