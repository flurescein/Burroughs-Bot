export function cutup(inputString: string, shouldDeletePunctuation = true) {
  if (shouldDeletePunctuation) {
    inputString = inputString
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ')
  }

  return inputString
    .split(' ')
    .map(word => ({ sortingKey: Math.random(), word }))
    .sort((a, b) => a.sortingKey - b.sortingKey)
    .map(({ word }) => word)
    .join(' ')
}
