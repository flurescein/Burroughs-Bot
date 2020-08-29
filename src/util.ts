import Parser from 'rss-parser'

export function cutup(inputString: string, shouldDeletePunctuation = true) {
  if (shouldDeletePunctuation) {
    inputString = inputString
      .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '')
      .replace(/\s{2,}/g, ' ')
  }

  return inputString
    .split(' ')
    .map(word => ({ sortingKey: Math.random(), word }))
    .sort((a, b) => a.sortingKey - b.sortingKey)
    .map(({ word }) => word)
    .join(' ')
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function randomBetween(from: number, to: number) {
  return from + Math.floor((to - from) * Math.random())
}

export async function getLastNewsFromRss(
  channels: string[],
  newsCount: number
) {
  const rssParser = new Parser()
  const parsedChannels = await Promise.all(
    channels.map(channel => rssParser.parseURL(channel))
  )

  return parsedChannels
    .map(({ items }) =>
      items?.slice(0, newsCount).map(({ contentSnippet }) => contentSnippet)
    )
    .flat()
}
