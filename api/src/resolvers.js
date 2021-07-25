const resolvers = {
  Query: {
    planets(_, { page, pageSize }, { dataSources: { planetsService } }) {
      return planetsService.getAllPlanets(page, pageSize)
    },

    characters(
      _,
      { page, pageSize, planet, birthDate },
      { dataSources: { charactersService } }
    ) {
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
}

export default resolvers
