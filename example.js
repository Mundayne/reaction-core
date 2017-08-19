const RC = require('./src/index')
const bot = new RC.Client()

bot.on('message', msg => {
  if (msg.content === '!!!test') {
    let Msg = new RC.Message('test', msg.channel)
    Msg.AddMenu()
    let btn = new RC.Button()
    nums.forEach(num => {
      btn.SetEmoji(num.e)
      btn.SetCallback(Btn)
      btn.SetData({n: num.n})
      Msg.Menu.AddButton(btn)
    })
    Msg.Send()
  }
})

bot.on('ready', () => {
  console.log('ready!')
})

bot.login('token-here')

const nums = [{e: '😄', n: 'one'}, {e: '🤔', n: 'two'}, {e: '🤣', n: 'three'}, {e: '😠', n: 'four'}, {e: '🔟', n: 'ten'}]

const Btn = (user, message, data = null) => {
  message.edit(data.n).catch(console.error)
}
