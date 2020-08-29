import { Middleware } from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'

import { message, command } from './settings.json'
import { cutup } from './util'

type Handler = Middleware<TelegrafContext>

export const start: Handler = ({ reply }) => reply(message.start)

export const help: Handler = ({ reply }) => reply(message.help)

export const cutupMessage: Handler = ({ message: incomingMessage, reply }) => {
  const messageText = incomingMessage?.text

  if (messageText === undefined) {
    reply(message.error)
  } else if (messageText.startsWith(command.savePunctuation)) {
    const transformedMessage = cutup(
      messageText.substring(command.savePunctuation.length),
      false
    )
    reply(transformedMessage)
  } else {
    const transformedMessage = cutup(messageText)
    reply(transformedMessage)
  }
}
