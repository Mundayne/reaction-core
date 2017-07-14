const Discord = require('discord.js');

const Button = require('./button');
const EventEmitter = require('events').EventEmitter;

/**
 * A Menu belonging to a [MenuMessage]{@link MenuMessage}.
 */
class Menu {
  /**
   * Creates a Menu.
   *
   * @param  {Client} client The Client the Mesnu belongs to.
   */

  constructor(client) {
    /**
     * The Client the Menu belongs to.
     * @name MenuManager#Client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'Client', {value:client});
    /**
     * A Collection of [Buttons]{@link Button} belonging to this Menu.
     */
    this.Buttons = new Discord.Collection();
    /**
     * The Message that this Menu has been sent with.
     */
    this.Message;
  }

  /**
   * @callback ButtonCallback
   * @param {User} user The User who clicked the Button.
   * @param {Client} client The Client the Button belongs to.
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
  AddButton(emoji, callback, data = undefined) {
    //Create a new Button and add it to this Menu's Buttons Collection.
    this.Buttons.set(emoji, new Button(emoji, callback, data));
  }

  /**
   * Displays this Menu's Buttons.
   * @see Button#Draw
   *
   * @param  {Message} m The Message this Menu belongs to.
   */
  Display(m) {
    //Set Message so this Menu knows what it belongs to.
    this.Message = m;
    //Register this Menu, as it is now complete and active.
    this.Client.MenuManager.Register(this);

    //Loop through every Button this Menu has, and display it @see {}
    this.Buttons.forEach(button => {
      button.Draw(m);
    });
  }
}
module.exports = Menu;
