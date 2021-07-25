class Planet {
  constructor(
    id,
    name,
    description,
    code,
    pictureUrl,
    population,
    characters = []
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.code = code
    this.pictureUrl = pictureUrl
    this.population = population
    this.characters = characters
  }
}

export default Planet
