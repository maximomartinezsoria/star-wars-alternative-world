import readSeed from '../util/readSeed.js'

async function getCharacters(knex) {
  const characters = readSeed('characters')
  const planetCodes = characters.map((character) => character.planet)
  const planets = await knex('planets')
    .select('id', 'code')
    .whereIn('code', planetCodes)
    .then((planetsData) =>
      planetsData.reduce(
        (planetsObj, planet) => ({ ...planetsObj, [planet.code]: planet.id }),
        {}
      )
    )

  return characters.map((character) => ({
    planet_id: planets[character.planet],
    name: character.name,
    description: character.description,
    born_at: character.bornAt,
    picture_url: character.pictureUrl,
  }))
}

export async function seed(knex) {
  const tableName = 'characters'
  const characters = await getCharacters(knex)
  return knex(tableName)
    .del()
    .then(() => knex(tableName).insert(characters))
}
