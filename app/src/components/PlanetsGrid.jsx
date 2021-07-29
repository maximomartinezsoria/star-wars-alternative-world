import Card from '../components/Card'
import { useQuery } from '@apollo/client'
import GET_ALL_PLANETS from '../queries/getAllPlanets'
import Grid from '../styles/Grid'
import EmptyState from '../components/EmptyState'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import useNewId from '../hooks/useNewId'
import { useHistory } from 'react-router-dom'

export default function PlanetsGrid({ selectedPlanet, setSelectedPlanet }) {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_ALL_PLANETS, {
    variables: { pageSize: 12 },
  })
  const newPlanetId = useNewId('NEW_PLANET')

  const openPlanetsForm = () => history.push('/planets/create')

  if (loading || error) return <LoadingAndErrorState error={!!error} />

  if (data.planets.nodes.length === 0)
    return <EmptyState entity="Planet" onClick={openPlanetsForm} />
  return (
    <Grid>
      {data.planets.nodes.map((planet) => (
        <Card
          key={planet.id}
          title={`Planet ${planet.name}`}
          image={planet.pictureUrl}
          text={`Pop: ${planet.population}`}
          className={
            selectedPlanet && selectedPlanet.id === planet.id
              ? 'selected'
              : '' + newPlanetId === planet.id
              ? 'highlight'
              : ''
          }
          onClick={() => {
            setSelectedPlanet(planet)
          }}
        />
      ))}
    </Grid>
  )
}
