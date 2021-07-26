import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import GET_CHARACTERS from '../queries/getCharacters'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
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
              onClick={() => {
                setSelectedCharacter(character)
              }}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState entity="Character" />
      )}

      {selectedCharacter && (
        <Sidebar
          title={selectedCharacter.name}
          text={selectedCharacter.description}
          descriptionList={[
            { title: 'Planet', text: selectedCharacter.planet.name },
            { title: 'Friends', text: `${data.characters.nodes.length}` },
          ]}
          charactersListTitle="Friends"
          characters={data.characters.nodes.map((character) => ({
            id: character.id,
            name: character.name,
            text: character.description,
            pictureUrl: character.pictureUrl,
          }))}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </Layout>
  )
}
