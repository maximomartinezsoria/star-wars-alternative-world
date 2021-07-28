import { useState } from 'react'
import { useHistory, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { useQuery } from '@apollo/client'
import GET_ALL_PLANETS from '../queries/getAllPlanets'
import GET_PLANET_DETAIL from '../queries/getPlanetDetail'
import Grid from '../styles/Grid'
import EmptyState from '../components/EmptyState'
import PlanetFormModal from '../components/modals/PlanetFormModal'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import useNewId from '../hooks/useNewId'
import Sidebar, {
  SidebarHeader,
  SidebarDescriptionList,
  SidebarCharactersList,
} from '../components/Sidebar'
import InlineCard from '../components/InlineCard'

export default function Planets() {
  const history = useHistory()
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const { loading, error, data } = useQuery(GET_ALL_PLANETS, {
    variables: { pageSize: 12 },
  })
  const newPlanetId = useNewId('NEW_PLANET')

  const openPlanetsForm = () => history.push('/planets/create')
  const openCharactersForm = (planetCode) => {
    const planetCodeParam = planetCode ? `?planet=${planetCode}` : ''
    history.push(`/characters/create${planetCodeParam}`)
  }

  if (loading || error)
    return (
      <Layout>
        <LoadingAndErrorState error={!!error} />
      </Layout>
    )

  return (
    <Layout
      onPlusButtonClick={selectedPlanet ? openCharactersForm : openPlanetsForm}
    >
      <Route path="/planets/create" component={PlanetFormModal} />
      {data.planets.nodes.length > 0 ? (
        <Grid>
          {data.planets.nodes.map((planet) => (
            <Card
              key={planet.id}
              title={`Planet ${planet.name}`}
              image={planet.pictureUrl}
              text={`Pop: ${planet.population}`}
              className={
                selectedPlanet && selectedPlanet.id === planet.id
                  ? 'selected'
                  : '' + newPlanetId === planet.id
                  ? 'highlight'
                  : ''
              }
              onClick={() => {
                setSelectedPlanet(planet)
              }}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState entity="Planet" onClick={openPlanetsForm} />
      )}

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
