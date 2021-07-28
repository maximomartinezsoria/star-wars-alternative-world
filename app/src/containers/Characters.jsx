import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import GET_ALL_CHARACTERS from '../queries/getAllCharacters'
import GET_CHARACTER_DETAIL from '../queries/getCharacterDetail'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import CharacterFormModal from '../components/modals/CharacterFormModal'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import FilterByPlanet from '../components/FilterByPlanet'
import useNewId from '../hooks/useNewId'
import Sidebar, {
  SidebarHeader,
  SidebarDescriptionList,
  SidebarCharactersList,
} from '../components/Sidebar'
import InlineCard from '../components/InlineCard'

export default function Characters() {
  const history = useHistory()
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
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
              text="5 friends"
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
        query={{
          query: GET_CHARACTER_DETAIL,
          variables: { characterId: +selectedCharacter?.id },
        }}
        show={!!selectedCharacter}
      >
        {(queryResponse, dataForCharactersList) => (
          <>
            <SidebarHeader
              title={queryResponse.data?.character.name || ''}
              text={queryResponse.data?.character.description || ''}
              onClose={() => setSelectedCharacter(null)}
            />
            <SidebarDescriptionList>
              <div>
                <dt>Planet</dt>
                <dd>{queryResponse.data?.character.planet.name}</dd>
              </div>
              <div>
                <dt>Friends</dt>
                <dd>{queryResponse.data?.character.friends.length}</dd>
              </div>
            </SidebarDescriptionList>
            <SidebarCharactersList
              title="Friends"
              onPlusButtonClick={openForm}
              queryInfo={{
                ...dataForCharactersList,
                hasCharacters: !!queryResponse.data?.character.friends.length,
              }}
              emptyText={`${queryResponse.data?.character.name} doesn't have any friends.`}
            >
              {queryResponse.data?.character.friends.map((friend) => (
                <li key={friend.id}>
                  <InlineCard
                    title={friend.name}
                    image={friend.pictureUrl}
                    text={friend.description}
                  />
                </li>
              ))}
            </SidebarCharactersList>
          </>
        )}
      </Sidebar>
    </Layout>
  )
}
