import { useState } from 'react'
import { useHistory, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import GET_PLANET_DETAIL from '../queries/getPlanetDetail'
import PlanetFormModal from '../components/modals/PlanetFormModal'
import Sidebar, {
  SidebarHeader,
  SidebarDescriptionList,
  SidebarCharactersList,
} from '../components/Sidebar'
import InlineCard from '../components/InlineCard'
import PlanetsGrid from '../components/PlanetsGrid'

export default function Planets() {
  const history = useHistory()
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  const openPlanetsForm = () => history.push('/planets/create')
  const openCharactersForm = (planetCode) => {
    const planetCodeParam = planetCode ? `?planet=${planetCode}` : ''
    history.push(`/characters/create${planetCodeParam}`)
  }

  return (
    <Layout
      onPlusButtonClick={selectedPlanet ? openCharactersForm : openPlanetsForm}
    >
      <Route path="/planets/create" component={PlanetFormModal} />

      <PlanetsGrid
        selectedPlanet={selectedPlanet}
        setSelectedPlanet={setSelectedPlanet}
      />

      <Sidebar
        query={{
          query: GET_PLANET_DETAIL,
          variables: { planetId: +selectedPlanet?.id },
        }}
        show={!!selectedPlanet}
      >
        {(queryResponse, dataForCharactersList) => (
          <>
            <SidebarHeader
              title={queryResponse.data?.planet.name || ''}
              text={queryResponse.data?.planet.description || ''}
              onClose={() => setSelectedPlanet(null)}
            />
            <SidebarDescriptionList>
              <div>
                <dt>Population</dt>
                <dd>{queryResponse.data?.planet.population}</dd>
              </div>
            </SidebarDescriptionList>
            <SidebarCharactersList
              title="Characters"
              onPlusButtonClick={() =>
                openCharactersForm(queryResponse.data?.planet.code)
              }
              queryInfo={{
                ...dataForCharactersList,
                hasCharacters: !!queryResponse.data?.planet.characters.length,
              }}
              emptyText="Looks like this planet is empty..."
            >
              {queryResponse.data?.planet.characters.map((character) => (
                <li key={character.id}>
                  <InlineCard
                    title={character.name}
                    image={character.pictureUrl}
                    text={`${queryResponse.data?.planet.characters.length} friends`}
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
