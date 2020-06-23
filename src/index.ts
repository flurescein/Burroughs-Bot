import { Telegraf } from 'telegraf'

import { cutup } from './cutup'
import {
  start,
  help,
  savePunctuationCommand,
  errorMessage,
} from './messages.json'

const bot = new Telegraf(process.env.BOT_TOKEN || '1488')

bot.start(({ reply }) => reply(start))
bot.help(({ reply }) => reply(help))

bot.on('text', ({ message, reply }) => {
  const inputText = message?.text

  if (inputText === undefined) {
    reply(errorMessage)
  } else if (inputText.startsWith(savePunctuationCommand)) {
    const transformedMessage = cutup(
      inputText.substring(savePunctuationCommand.length),
      false
    )
    reply(transformedMessage)
  } else {
    const transformedMessage = cutup(inputText)
    reply(transformedMessage)
  }
})

bot.launch()
