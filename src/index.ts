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
  if (message === undefined || message.text === undefined) {
    reply(errorMessage)
  } else if (message.text.startsWith(savePunctuationCommand)) {
    const transformedMessage = cutup(
      message.text.substring(savePunctuationCommand.length),
      false
    )
    reply(transformedMessage)
  } else {
    const transformedMessage = cutup(message.text)
    reply(transformedMessage)
  }
})

bot.launch()
