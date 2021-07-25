import { SQLDataSource } from 'datasource-sql'
import { createPlanetFromDbResponse } from '../util/createFromDbResponse.js'

class PlanetsService extends SQLDataSource {
  static populationQuery() {
    return '(select count(*) from characters where characters.planet_id = planets.id) as population'
  }

  async getAllPlanets(page = 1, pageSize = 10) {
    const planetsData = await this.knex
      .select('*', this.knex.raw(PlanetsService.populationQuery()))
      .from('planets')
      .limit(pageSize)
      .offset(page === 1 ? 0 : page * pageSize)
    const planets = planetsData.map(createPlanetFromDbResponse)
    return {
      pagination: { total: this.getTotalRecords(), page, pageSize },
      nodes: planets,
    }
  }

  async createPlanet(planetData) {
    const planet = await this.knex
      .insert(planetData)
      .into('planets')
      .returning('*')
    return createPlanetFromDbResponse(planet[0])
  }

  getTotalRecords() {
    return this.knex
      .count('*')
      .from('planets')
      .then((data) => data[0].count)
      .then(Number)
  }
}

export default PlanetsService
