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
}

export default resolvers
