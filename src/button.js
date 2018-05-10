class Button {
  constructor (emoji, callback) {
    this.setEmoji(emoji)
    this.setCallback(callback)
  }

  setEmoji (emoji) {
    if (typeof emoji !== 'string') {
      console.trace('Emoji type should be string.')
      return false
    }
    this.emoji = emoji
    return emoji
  }

  setCallback (callback) {
    if (typeof emoji !== 'function') {
      console.trace('Callback type should be function.')
      return false
    }
    this.run = callback
    return callback
  }
}
module.exports = Button
