/**
 * Wraps all user-needed classes.
 * @namespace ReactionMenus
 */

module.exports = {
  Client: require('./structures/Client'),
  Manager: require('./structures/MenuManager'),
  Message: require('./structures/MenuMessage'),
  Button: require('./structures/ButtonBuilder')
}
