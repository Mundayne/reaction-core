# reaction-core
This is an NPM module that allows you to create snazzy little menus on your bot's messages using reactions.
~~Note that currently only default Discord emotes will work.~~

Now with support for custom emoji! You must provide *only* the numerical part of the emoji ID as the Button's emoji in order for this to work.

## Development
Currently `reaction-core` is being maintained by Discord user *Mundane#9887*. There is still some additional functionality to add, and suggestions and bug reports are welcome and encouraged.

## Basic Usage
See `example.js` for the complete code.

Firstly, grab the module and make a handler. The handler will handle all the incoming emoji reactions, as well as save and load past menus.
```js
const RC = require('reaction-core')
const handler = new RC.Handler()
```

Secondly, handle reactions being made:
```js
client.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
```

That's all you have to do to ensure all your menus will function correctly. To actually make a menu, a few more steps are needed.

A menu is basically a message with a collection of emoji that execute specific callbacks, known as buttons. One menu can have up to 20 buttons; this is Discord's limit of the amount of reactions you can have on one message. You could, however, have a button that changes all the buttons (changing page, if you like), effectively making the limit useless. Below is example code for creating a simple menu that just changes the colour of the embed of the menu. There are endless possibilities to what it can actually do - some uses I know of are a jukebox and a user moderation menu where each button is a different moderation action. The code for the buttons is in `exButtons.js`, so that only code relevant to the module is in the main example file.

Note that in the following code, I use an array of object literals as my buttons. `reaction-core` also exports a Button class that can be used to create buttons.

First, let's create the menu, passing it the text to display and it's buttons.
```js
let changeColour = new RC.Menu(example.embed, example.buttons, example.options)
```
The options object currently owner supports setting an 'owner', whereby the specified user is the only one who can interact with the menu, specified by ID. An example options object is
```js
{
  owner: '216399535390326794'
}
```

Next, register the menu to the handler.
```js
handler.addMenus(changeColour)
```
Like the previous code, you can specify an infinite number of menus at once.

Finally, send the menu. You can do this however you want; I did it in an example command ran by doing `rc!test`:
```js
client.on('message', message => {
  if (!message.author.bot && message.content === 'rc!test') {
    message.channel.sendMenu(changeColour)
  }
})
```

And that's it! The menu will get sent, and clicking the buttons changes the colour of the embed. `example.js` will compile and run if you give it a valid bot token at the bottom of the file.

### To-Do:
- [ ] Better error-checking and reporting.
- [ ] Finish this list.
