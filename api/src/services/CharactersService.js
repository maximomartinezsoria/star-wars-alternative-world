import { UserInputError } from 'apollo-server-koa'
import { SQLDataSource } from 'datasource-sql'
import { createCharacterWithPlanetFromDbResponse } from '../util/createFromDbResponse.js'
import PlanetsService from './PlanetsService.js'

class CharactersService extends SQLDataSource {
  async getAllCharacters(
    page = 1,
    pageSize = 10,
    planet = null,
    birthDate = null
  ) {
    const charactersData = await this.leftJoinPlanets()
      .where((builder) => {
        if (planet) return builder.where({ planet_id: planet })
        return true
      })
      .andWhere((builder) => {
        if (birthDate) {
          const dateObj = new Date(birthDate)
          const start = dateObj.toISOString()
          dateObj.setDate(dateObj.getDate() + 1)
          const end = dateObj.toISOString()
          return builder.whereBetween('born_at', [start, end])
        }
        return true
      })
      .limit(pageSize)
      .offset(page === 1 ? 0 : page * pageSize)
      .orderBy('characters.created_at', 'DESC')
      .options({ nestTables: true })

    const characters = charactersData.map(
      createCharacterWithPlanetFromDbResponse
    )
    return {
      pagination: { total: this.getTotalRecords(), page, pageSize },
      nodes: characters,
    }
  }

  getCharacterById(id) {
    return this.leftJoinPlanets()
      .where({ 'characters.id': id })
      .first('*')
      .then(createCharacterWithPlanetFromDbResponse)
  }

  async createCharacter(characterData, planetCode) {
    const planet = await PlanetsService.getPlanetByCode(this.knex, planetCode)

    if (!planet) throw new UserInputError('Planet must exist')

    const newCharacterData = await this.knex
      .insert({ ...characterData, planet_id: planet.id })
      .into('characters')
      .returning('*')

    return createCharacterWithPlanetFromDbResponse({
      character: newCharacterData[0],
      planet,
    })
  }

  leftJoinPlanets() {
    return this.knex
      .select(
        this.knex.raw('to_json(characters.*) as character'),
        this.knex.raw('to_json(planets.*) as planet')
      )
      .from('characters')
      .leftJoin('planets', 'planets.id', 'characters.planet_id')
  }

  getTotalRecords() {
    return this.knex
      .count('*')
      .from('characters')
      .then((data) => data[0].count)
      .then(Number)
  }
}

export default CharactersService
