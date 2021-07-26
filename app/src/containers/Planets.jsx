import Layout from '../components/Layout'
import PlanetLoader from '../components/icons/PlanetLoader'
import Card from '../components/Card'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import GET_PLANETS from '../queries/getPlanets'
import Grid from '../styles/Grid'

const PlanetsEmptyStateStyles = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;

  svg {
    margin-bottom: 4rem;
  }

  h2 {
    margin-bottom: 2.4rem;
  }
`

export default function Planets() {
  const { loading, error, data } = useQuery(GET_PLANETS, {
    variables: { pageSize: 12 },
  })

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error!</p>

  return (
    <Layout title="Spacious">
      {data.planets.nodes.length > 0 ? (
        <Grid>
          {data.planets.nodes.map((planet) => (
            <Card
              key={planet.id}
              title={`Planet ${planet.name}`}
              image={planet.pictureUrl}
              text={`Pop: ${planet.population}`}
            />
          ))}
        </Grid>
      ) : (
        <PlanetsEmptyStateStyles>
          <PlanetLoader />
          <h2>Space doesn't have to be so empty.</h2>
          <button>Create Planet</button>
        </PlanetsEmptyStateStyles>
      )}
    </Layout>
  )
}
