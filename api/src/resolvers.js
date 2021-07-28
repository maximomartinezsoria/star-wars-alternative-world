import {
  validateDate,
  validatePagination,
  validatePositiveInteger,
  validateUserIsLoggedIn,
  validateUserInfo,
} from './util/validation.js'

const resolvers = {
  Query: {
    planets(
      _,
      { page = 1, pageSize = 10 },
      { dataSources: { planetsService }, user }
    ) {
      validateUserIsLoggedIn(user)
      validatePagination(page, pageSize)
      return planetsService.getAllPlanets(page, pageSize)
    },

    characters(
      _,
      { page = 1, pageSize = 10, planet, birthDate },
      { dataSources: { charactersService }, user }
    ) {
      validateUserIsLoggedIn(user)
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

    character(_, { id }, { dataSources: { charactersService }, user }) {
      validateUserIsLoggedIn(user)
      return charactersService.getCharacterById(id)
    },
  },

  Planet: {
    async characters(
      planet,
      { limit },
      { dataSources: { charactersService }, user }
    ) {
      validateUserIsLoggedIn(user)
      const characters = await charactersService.getAllCharacters(
        1,
        limit,
        planet.id,
        null
      )
      return characters.nodes
    },
  },

  Character: {
    async friends(
      character,
      { limit },
      { dataSources: { charactersService }, user }
    ) {
      validateUserIsLoggedIn(user)
      const friends = await charactersService.getAllCharacters(1, 5)
      // const friends = await charactersService.getCharacterFriends(character.id, limit)
      return friends.nodes
    },
  },

  Mutation: {
    createCharacter(
      _,
      { characterInfo },
      { dataSources: { charactersService }, user }
    ) {
      validateUserIsLoggedIn(user)
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

    createPlanet(_, { planetInfo }, { dataSources: { planetsService }, user }) {
      validateUserIsLoggedIn(user)
      const planetData = {
        name: planetInfo.name,
        description: planetInfo.description,
        code: planetInfo.code,
        picture_url: planetInfo.pictureUrl,
      }
      return planetsService.createPlanet(planetData)
    },

    login(_, { userInfo }, { dataSources: { usersService } }) {
      validateUserInfo(userInfo)
      return usersService.loginUser(userInfo.username, userInfo.password)
    },

    register(_, { userInfo }, { dataSources: { usersService } }) {
      validateUserInfo(userInfo)
      return usersService.registerUser(userInfo.username, userInfo.password)
    },
  },
}

export default resolvers
