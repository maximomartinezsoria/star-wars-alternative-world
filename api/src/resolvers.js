import {
  validateDate,
  validatePagination,
  validatePositiveInteger,
} from './util/validation.js'

const resolvers = {
  Query: {
    planets(
      _,
      { page = 1, pageSize = 10 },
      { dataSources: { planetsService } }
    ) {
      validatePagination(page, pageSize)
      return planetsService.getAllPlanets(page, pageSize)
    },

    characters(
      _,
      { page = 1, pageSize = 10, planet, birthDate },
      { dataSources: { charactersService } }
    ) {
      validatePagination(page, pageSize)
      validateDate(birthDate, 'birthDate')
      if (planet) validatePositiveInteger(planet, 'planet')
      return charactersService.getAllCharacters(
        page,
        pageSize,
        planet,
        birthDate
      )
    },

    character(_, { id }, { dataSources: { charactersService } }) {
      return charactersService.getCharacterById(id)
    },
  },

  Planet: {
    async characters(
      planet,
      { limit },
      { dataSources: { charactersService } }
    ) {
      const characters = await charactersService.getAllCharacters(
        1,
        limit,
        planet.id,
        null
      )
      return characters.nodes
    },
  },

  Mutation: {
    createCharacter(
      _,
      { characterInfo },
      { dataSources: { charactersService } }
    ) {
      const characterData = {
        name: characterInfo.name,
        description: characterInfo.description,
        picture_url: characterInfo.pictureUrl,
        born_at: characterInfo.bornAt,
      }
      return charactersService.createCharacter(
        characterData,
        characterInfo.planet
      )
    },

    createPlanet(_, { planetInfo }, { dataSources: { planetsService } }) {
      const planetData = {
        name: planetInfo.name,
        description: planetInfo.description,
        code: planetInfo.code,
        picture_url: planetInfo.pictureUrl,
      }
      return planetsService.createPlanet(planetData)
    },
  },
}

export default resolvers
