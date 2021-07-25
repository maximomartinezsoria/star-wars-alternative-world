import { SQLDataSource } from 'datasource-sql'
import { createPlanetWithCharactersFromDbData } from '../util/createFromDbResponse.js'

class PlanetsService extends SQLDataSource {
  async getAllPlanets(page = 1, pageSize = 10) {
    const planetsData = await this.knex
      .select('*')
      .from('planets')
      .limit(pageSize)
      .offset(page === 1 ? 0 : page * pageSize)
    const planets = planetsData.map(createPlanetWithCharactersFromDbData)
    return {
      pagination: { total: this.getTotalRecords(), page, pageSize },
      nodes: planets,
    }
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
