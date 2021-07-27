import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import GET_CHARACTERS from '../queries/getCharacters'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'
import CharacterFormModal from '../components/modals/CharacterFormModal'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import { useHistory, Route } from 'react-router-dom'

export default function Characters() {
  const history = useHistory()
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { pageSize: 12 },
  })

  const openForm = () => history.push('/characters/create')

  if (loading || error)
    return (
      <Layout>
        <LoadingAndErrorState error={!!error} />
      </Layout>
    )

  return (
    <Layout onPlusButtonClick={openForm}>
      <Route path="/characters/create" component={CharacterFormModal} />
      {data.characters.nodes.length > 0 ? (
        <Grid>
          {data.characters.nodes.map((character) => (
            <Card
              key={character.id}
              title={character.name}
              image={character.pictureUrl}
              text="10 friends"
              className={
                selectedCharacter && selectedCharacter.id === character.id
                  ? 'selected'
                  : ''
              }
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
          charactersQuery={{
            query: GET_CHARACTERS,
            variables: { pageSize: 3 },
          }}
          onClose={() => setSelectedCharacter(null)}
          onPlusButtonClick={openForm}
        />
      )}
    </Layout>
  )
}
