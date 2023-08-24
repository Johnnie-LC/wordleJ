import { WORDS } from './words'

function getWords () {
  const word5 = WORDS.filter(word => word.length === 5)

  return ([...word5, ...word5, ...word5])
}

function getDayOfTheYear () {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = (now as any) - (start as any) + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function getWordOfTheDay () {
  const words = getWords()
  const wordsOfTheDay = words[getDayOfTheYear()]

  if (typeof wordsOfTheDay === 'string') {
    return wordsOfTheDay.toUpperCase()
  }

  return undefined
}

export function isValidWord (word: string) {
  const words = getWords()

  return words.includes(word.toLowerCase())
}

const APIWords = 'data/words.txt'

export const fetchWordsTwo = async () => await fetch(APIWords)
  .then(async (response) => await response.text())
  .then((text) => {
    // const wordsArray = text.split('\n')
    const wordsArray = text.split(/\s+/)
    return wordsArray
  })
  .catch((error) => {
    console.log('Error al cargar el archivo:', error)
  })

export const fetchWords = async () => {
  try {
    const response = await fetch(APIWords)
    if (!response.ok) {
      throw new Error('Error al cargar el archivo')
    }
    const data = await response.text()
    const wordsArray = data.split(/\s+/)
    return wordsArray
  } catch (error) {
    console.log('Error al cargar el archivo:', error)
  }
}
