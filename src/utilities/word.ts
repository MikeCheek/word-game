import randomNumber from './randomNumber'
//import data from './words.json'
import dataEN from './dictionary.json'
import dataIT from './parole.json'

const randomWord = (length: number = 20, language: string = 'en'): string => {
  const data = language === 'en' ? dataEN : dataIT
  const keys = Object.keys(data)
  const l = keys.length
  let rand

  while (true) {
    rand = randomNumber(0, l - 1)
    if (keys[rand].length <= length && keys[rand].match(/^([a-z]|[A-Z])*$/i)) break
  }

  return keys[rand]
}

export const getDefinition = (key: string): string => {
  return dataEN[key]
}

export default randomWord
