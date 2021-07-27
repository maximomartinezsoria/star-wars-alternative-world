import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { useQuery } from '@apollo/client'
import GET_PLANETS from '../queries/getPlanets'
import Grid from '../styles/Grid'
import Sidebar from '../components/Sidebar'
import EmptyState from '../components/EmptyState'
import PlanetFormModal from '../components/modals/PlanetFormModal'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import { useHistory, Route } from 'react-router-dom'

export default function Planets() {
  const history = useHistory()
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const { loading, error, data } = useQuery(GET_PLANETS, {
    variables: { pageSize: 12 },
  })

  const openForm = () => history.push('/planets/create')

  if (loading || error)
    return (
      <Layout>
        <LoadingAndErrorState error={!!error} />
      </Layout>
    )

  return (
    <Layout onPlusButtonClick={openForm}>
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
                  : ''
              }
              onClick={() => {
                setSelectedPlanet(planet)
              }}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState entity="Planet" />
      )}

      {selectedPlanet && (
        <Sidebar
          title={selectedPlanet.name}
          text={selectedPlanet.description}
          descriptionList={[
            { title: 'Population', text: `${selectedPlanet.population}` },
          ]}
          charactersListTitle="Characters"
          characters={selectedPlanet.characters.map((character) => ({
            id: character.id,
            name: character.name,
            text: `${selectedPlanet.characters.length}`,
            pictureUrl: character.pictureUrl,
          }))}
          onClose={() => setSelectedPlanet(null)}
          onPlusButtonClick={openForm}
        />
      )}
    </Layout>
  )
}
