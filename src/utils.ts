import { COUNTRIES_TO_PLAY } from "./constants"
import type { Country } from "./types/Game"

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
function shuffleArray<T>(array: Array<T>) {
  let counter = array.length, temp, index
  const newArray = [...array]

  while (counter > 0) {
    index = Math.floor(Math.random() * counter)
    counter--
    temp = newArray[counter]
    newArray[counter] = newArray[index]
    newArray[index] = temp
  }

  return newArray
}

export const createArrayToPlay = (countries: Country[]) => {
  const { length } = countries
  if (length > 0) {
    const randomIndex = randomIntFromInterval(0, countries.length)
    const startIndex = (randomIndex + COUNTRIES_TO_PLAY > length) ? randomIndex - COUNTRIES_TO_PLAY : randomIndex
    const endIndex = (randomIndex + COUNTRIES_TO_PLAY > length) ? length : randomIndex + COUNTRIES_TO_PLAY
    const arrayToPlay = countries.slice(startIndex, endIndex)
  
    return shuffleArray<Country>([...arrayToPlay, ...arrayToPlay])
  }

  return countries
}
