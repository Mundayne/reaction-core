const COLOURS = {
  red: 0xff0000,
  green: 0x00ff00,
  blue: 0x0000ff,
  white: 0xffffff
}

const buttons = [
  { emoji: '1⃣',
    run: (user, message) => {
      let newEmbed = embed
      embed.color = COLOURS.red
      message.edit({ embed: newEmbed })
    }
  },
  { emoji: '2⃣',
    run: (user, message) => {
      let newEmbed = embed
      embed.color = COLOURS.green
      message.edit({ embed: newEmbed })
    }
  },
  { emoji: '3⃣',
    run: (user, message) => {
      let newEmbed = embed
      embed.color = COLOURS.blue
      message.edit({ embed: newEmbed })
    }
  }
]

const embed = {
  fields: [
    {
      name: '1',
      value: 'Red'
    },
    {
      name: '2',
      value: 'Green'
    },
    {
      name: '3',
      value: 'Blue'
    }
  ],
  color: COLOURS.white
}

module.exports = {
  buttons: buttons,
  embed: embed,
  COLOURS: COLOURS
}
