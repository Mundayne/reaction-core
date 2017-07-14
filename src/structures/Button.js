/**
 * A Button on a [Menu]{@link Menu}.
 */
class MenuButton {
  /**
   * Creates a Button.
   *
   * @param  {string} emoji The emoji which graphically represents the Button.
   * @param  {ButtonCallback} Callback The callback function of the Button.
   * @param  {Object} [data=undefined] Additional data for the Callback.
   */

  constructor(emoji, Callback, data = undefined) {
    /**
     * The emoji this Button is represented graphically by.
     * @name MenuButton#Emoji
     * @type {string}
     * @readonly
     */
    Object.defineProperty(this, 'Emoji', {value:emoji});
    /**
     * This Button's callback function.
     */
    this.Callback = Callback;
    /**
     * Optional data to be passed to this Button's callback.
     */
    this.Data = data;
  }

  /**
   * Draws this button by reacting to the provided Message.
   *
   * @param  {Message} m The Message to Draw to.
   */
  Draw(m) {
    //React.
    m.react(this.Emoji);
  }
}
module.exports = MenuButton;
