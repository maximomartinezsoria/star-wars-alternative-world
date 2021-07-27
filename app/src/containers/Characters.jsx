import { useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import GET_CHARACTERS from '../queries/getCharacters'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'
import CharacterFormModal from '../components/modals/CharacterFormModal'
import LoadingAndErrorState from '../components/LoadingAndErrorState'

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { pageSize: 12 },
  })

  const closeForm = useCallback(() => setShowForm(false), [setShowForm])
  const openForm = useCallback(() => setShowForm(true), [setShowForm])

  if (loading || error)
    return (
      <Layout>
        <LoadingAndErrorState error={!!error} />
      </Layout>
    )

  return (
    <Layout onPlusButtonClick={openForm}>
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
          characters={data.characters.nodes.map((character) => ({
            id: character.id,
            name: character.name,
            text: character.description,
            pictureUrl: character.pictureUrl,
          }))}
          onClose={() => setSelectedCharacter(null)}
          onPlusButtonClick={openForm}
        />
      )}

      <CharacterFormModal show={showForm} closeForm={closeForm} />
    </Layout>
  )
}
