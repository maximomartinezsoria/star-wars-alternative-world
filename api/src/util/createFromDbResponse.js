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

export function createPlanetFromDbResponse(planetData) {
  const { id, name, description, code, picture_url: pictureUrl } = planetData
  const population = 1
  const planet = new Planet(id, name, description, code, pictureUrl, population)
  return planet
}

export function createCharacterWithPlanetFromDbResponse({
  character: characterData,
  planet: planetData,
}) {
  const planet = createPlanetFromDbResponse(planetData)
  const character = createCharacterFromDbResponse({ characterData, planet })
  return character
}
