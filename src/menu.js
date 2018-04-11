const level = require('level')

class Menu {
  constructor (text, ...buttons) {
    this.text = text
    this.buttons = { }
    this.addButtons(...buttons)
  }

  addButtons (...buttons) {
    let buttonsObj = { }
    buttons.forEach(button => {
      // Don't add duplicate buttons
      if (this.buttons[button.emoji]) return console.warn(`Warning! button ${button.emoji} already exists; skipping...`)
      buttonsObj[button.emoji] = button
    })
    // Merge current buttons and new buttons
    this.buttons = Object.assign(this.buttons, buttonsObj)
  }

  removeButtons (...buttons) {
    let key
    buttons.forEach(button => {
      // Can pass either button objects or emoji strings
      key = button.emoji || button
      delete this.buttons[key]
    })
  }

  register (message) {
    this.handler.menus[message.id] = this
  }

  async save () {
    let db = await level('../dat/store')
    let id = Date.now()
    await db.put(id, this.abstract(), err => {
      if (err) return console.error(err)
    })
    db.close()
    return id
  }

  abstract () {
    let obj = { }
    obj.message = this.message
    obj.text = this.text
    obj.buttons = this.buttons
    return obj
  }
}
module.exports = Menu
