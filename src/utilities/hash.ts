const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const hashToStr = (hash: string) => {
  let n = 1
  const l = hash[0]
  const h = hash.substring(2)
  const arrHash = Array.from(h.toLowerCase())
    .reverse()
    .map((char) => prevLetter(char, n++))
  const str = arrHash.join('')
  return [str.toUpperCase(), l]
}

export const strToHash = (str: string, lang: string = 'en') => {
  let n = 1
  const l = lang === 'en' ? 'e-' : 'i-'
  const arrHash = Array.from(str.toLowerCase())
    .map((char) => nextLetter(char, n++))
    .reverse()
  const hash = l + arrHash.join('')
  return hash.toUpperCase()
}

const nextLetter = (letter: string, n: number = 1): string => {
  const out = String.fromCharCode(letter.charCodeAt(0) + n)
  if (alphabet.includes(out)) return out
  return nextLetter('a', distance('z', letter))
}

const prevLetter = (letter: string, n: number = 1): string => {
  const out = String.fromCharCode(letter.charCodeAt(0) - n)
  if (alphabet.includes(out)) return out
  return prevLetter('z', distance(letter, 'a'))
}

const distance = (a: string, b: string): number => {
  return a.charCodeAt(0) - b.charCodeAt(0)
}
