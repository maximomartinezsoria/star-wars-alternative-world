import readSeed from '../util/readSeed.js'

function getPlanets() {
  const planets = readSeed('planets')
  return planets.map((planet) => ({
    name: planet.name,
    description: planet.description,
    code: planet.code,
    picture_url: planet.pictureUrl,
  }))
}

export function seed(knex) {
  const tableName = 'planets'
  const planets = getPlanets()

  return knex(tableName)
    .del()
    .then(() => knex(tableName).insert(planets))
}
