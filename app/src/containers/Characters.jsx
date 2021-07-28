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
import FilterByPlanet from '../components/FilterByPlanet'
import useNewId from '../hooks/useNewId'

export default function Characters() {
  const history = useHistory()
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { pageSize: 12, planet: selectedPlanet?.id },
  })
  const newCharacterId = useNewId('NEW_CHARACTER')

  const openForm = () => history.push('/characters/create')

  if (loading || error)
    return (
      <Layout>
        <LoadingAndErrorState error={!!error} />
      </Layout>
    )

  return (
    <Layout
      onPlusButtonClick={openForm}
      ExtendNavigationComponent={
        <FilterByPlanet setPlanet={setSelectedPlanet} />
      }
    >
      <Route
        path="/characters/create"
        render={(props) => (
          <CharacterFormModal {...props} selectedPlanet={selectedPlanet} />
        )}
      />
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
                  : '' + newCharacterId === character.id
                  ? 'highlight'
                  : ''
              }
              onClick={() => {
                setSelectedCharacter(character)
              }}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState entity="Character" onClick={openForm} />
      )}

      <Sidebar
        title={selectedCharacter?.name || ''}
        text={selectedCharacter?.description || ''}
        descriptionList={[
          { title: 'Planet', text: selectedCharacter?.planet.name || '' },
          { title: 'Friends', text: `${data?.characters.nodes.length}` },
        ]}
        charactersListTitle="Friends"
        charactersQuery={{
          query: GET_CHARACTERS,
          variables: { pageSize: 3 },
        }}
        onClose={() => setSelectedCharacter(null)}
        onPlusButtonClick={openForm}
        show={!!selectedCharacter}
      />
    </Layout>
  )
}
