import { Telegraf, Extra } from 'telegraf'

import { CronJob } from 'cron'

import { start, help, cutupMessage } from './handlers'
import { getLastNewsFromRss, cutup, randomBetween, capitalize } from './util'
import {
  cronCommand,
  channels,
  lastNewsCount,
  titleLengthRange,
  postLengthRange,
  channelUsername,
} from './settings.json'

const bot = new Telegraf(process.env.BOT_TOKEN || '1488')

// Bot.
bot.start(start)
bot.help(help)
bot.on('text', cutupMessage)

bot.launch()

// Digest.
new CronJob(cronCommand, async () => {
  const lastNews = await getLastNewsFromRss(channels, lastNewsCount)

  const postWords = cutup(lastNews.join(' ')).split(' ')
  const titleLength = randomBetween(titleLengthRange.min, titleLengthRange.max)
  const postLength = randomBetween(postLengthRange.min, postLengthRange.max)
  const post = {
    title: capitalize(postWords.slice(0, titleLength).join(' ')),
    text: capitalize(postWords.slice(titleLength, postLength).join(' ')),
  }

  bot.telegram.sendMessage(
    channelUsername,
    `<b>${post.title}</b>\n${post.text}`,
    Extra.HTML().markup(true)
  )
}).start()
