import { useQuery } from '@apollo/client'
import GET_ALL_CHARACTERS from '../queries/getAllCharacters'
import Grid from '../styles/Grid'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import useNewId from '../hooks/useNewId'
import LoadingAndErrorState from '../components/LoadingAndErrorState'
import { useHistory } from 'react-router-dom'

export default function CharactersGrid({
  selectedPlanet,
  selectedCharacter,
  setSelectedCharacter,
}) {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: { pageSize: 12, planet: selectedPlanet?.id },
  })
  const newCharacterId = useNewId('NEW_CHARACTER')

  const openForm = () => history.push('/characters/create')

  if (loading || error) return <LoadingAndErrorState error={!!error} />

  if (data.characters.nodes.length === 0)
    return <EmptyState entity="Character" onClick={openForm} />

  return (
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
  )
}
