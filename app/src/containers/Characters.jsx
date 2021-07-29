import { useState } from 'react'
import { Route } from 'react-router-dom'
import Layout from '../components/Layout'
import GET_CHARACTER_DETAIL from '../queries/getCharacterDetail'
import CharacterFormModal from '../components/modals/CharacterFormModal'
import FilterByPlanet from '../components/FilterByPlanet'
import Sidebar, {
  SidebarHeader,
  SidebarDescriptionList,
  SidebarCharactersList,
} from '../components/Sidebar'
import InlineCard from '../components/InlineCard'
import CharactersGrid from '../components/CharactersGrid'
import useOpenCharacterForm from '../hooks/useOpenCharacterForm'

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const openForm = useOpenCharacterForm(selectedPlanet)

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
          <CharacterFormModal selectedPlanet={selectedPlanet?.id} {...props} />
        )}
      />

      <CharactersGrid
        selectedPlanet={selectedPlanet}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />

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
