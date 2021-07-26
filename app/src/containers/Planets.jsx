import Layout from '../components/Layout'
import Card from '../components/Card'
import { useQuery } from '@apollo/client'
import GET_PLANETS from '../queries/getPlanets'
import Grid from '../styles/Grid'
import EmptyState from '../components/EmptyState'

export default function Planets() {
  const { loading, error, data } = useQuery(GET_PLANETS, {
    variables: { pageSize: 12 },
  })

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error!</p>

  return (
    <Layout>
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
        <EmptyState entity="Planet" />
      )}
    </Layout>
  )
}
