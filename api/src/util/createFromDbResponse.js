import Character from '../models/Character.js'
import Planet from '../models/Planet.js'

export function createCharacterFromDbResponse({ characterData, planet }) {
  const {
    id,
    name,
    description,
    born_at: bornAt,
    picture_url: pictureUrl,
  } = characterData

  const character = new Character(
    id,
    name,
    description,
    bornAt,
    pictureUrl,
    planet
  )

  return character
}

export function createPlanetFromDbResponse({ planetData, characters = [] }) {
  const { id, name, description, code, picture_url: pictureUrl } = planetData
  const population = 1
  const planet = new Planet(
    id,
    name,
    description,
    code,
    pictureUrl,
    population,
    characters
  )
  return planet
}

export function createCharacterWithPlanetFromDbResponse({
  character: characterData,
  planet: planetData,
}) {
  const planet = createPlanetFromDbResponse({ planetData })
  const character = createCharacterFromDbResponse({ characterData, planet })
  return character
}

export function createPlanetWithCharactersFromDbData(planetData) {
  const planet = createPlanetFromDbResponse({ planetData })
  // const characters = charactersData.map(({ characterData }) =>
  //   createCharacterFromDbResponse({ characterData, planet })
  // )
  // planet.characters = characters
  return planet
}
