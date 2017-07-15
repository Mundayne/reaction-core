const Menu = require('./menu');
const Discord = require('discord.js');

/**
 * A [Message]{@link Discord#Message} that has a [Menu]{@link Menu}.
 */
class MenuMessage {
  /**
   * Creates a new MenuMessage.
   *
   * @param  {Client} client The client this belongs to.
   * @param  {(string|RichEmbed)} content The content of the message.
   * @param  {Channel} channel The channel to send the message to, or the channel the message is in.
   * @param  {boolean} [embed=false] Whether or not content is a RichEmbed.
   */

  constructor(client, content, channel, embed = false) {
    /**
     * The Client the MenuMessage belongs to.
     * @name MenuMessage#Client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'Client', {value:client});
    /**
     * The Channel the MenuMessage exists in.
     * @name MenuMessage#Channel
     * @type {Channel}
     * @readonly
     */
    Object.defineProperty(this, 'Channel', {value:channel});
    /**
     * The content of the message.
     * @name MenuMessage#Content
     * @type {string|RichEmbed}
     * @readonly
     */
    Object.defineProperty(this, 'Content', {value:content});
    /**
     * Whether or not the message should be treated as a RichEmbed.
     * @name MenuMessage#Embed
     * @type {boolean}
     * @readonly
     */
    Object.defineProperty(this, 'Embed', {value:embed});
  }

  /**
   * Adds a Menu to this message.
   *
   * @param  {?Button[]} [buttons=null] An array of Buttons to add to the Menu.
   * @param  {Object} [data=undefined] Optional data to pass to the Button.
   */
  AddMenu(buttons = null, data = undefined) {
    //If this doesn't already have a Menu:
    if (!this.Menu) {
      //Create a new Menu.
      this.Menu = new Menu(this.Client);
      //If there have been Buttons passed:
      if (buttons) {
        //Loop through each Button, adding it to the Menu.
        buttons.forEach(button => {
          this.Menu.AddButton(button.Emoji, button.Callback, data);
        });
      }
    }
  }

  /**
   * Sends the MenuMessage, drawing the buttons and registering the menu.
   * @returns Promise<[Message]{@link Message}>
   */
  Send() {
    //Asynchronously sends the message, like default Discord messages.
    var sending = new Promise((resolve, reject) => {
      //If this is an emebed:
      if (this.Embed) {
        //Send the embed to the message's channel, then:
        this.Channel.send({embed:this.Content}).then(m => {
          //If this MenuMessage has a menu, display it and resolve this promise.
          if (this.Menu) this.Menu.Display(m);
          resolve(m);
        }).catch(console.error);
      }
      //Otherwise, send this message as a normal message, then:
      else this.Channel.send(this.Content)
        .then(m => {
          //If this MenuMessage has a menu, display it and resolve this promise.
          if (this.Menu) this.Menu.Display(m);
          resolve(m);
        }).catch(console.error);
    });

    //Return the promise.
    return sending;
  }
}
module.exports = MenuMessage;
