import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import GET_CHARACTERS from '../queries/getCharacters'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { pageSize: 12 },
  })

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error!</p>

  return (
    <Layout>
      {data.characters.nodes.length > 0 ? (
        <Grid>
          {data.characters.nodes.map((character) => (
            <Card
              key={character.id}
              title={character.name}
              image={character.pictureUrl}
              text="10 friends"
            />
          ))}
        </Grid>
      ) : (
        <EmptyState entity="Character" />
      )}
    </Layout>
  )
}
