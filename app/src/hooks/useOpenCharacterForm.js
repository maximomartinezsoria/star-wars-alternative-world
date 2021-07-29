import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export default function useOpenCharacterForm(selectedPlanet) {
  const history = useHistory()

  const openCharactersForm = useCallback(() => {
    const planetCodeParam = selectedPlanet
      ? `?planet=${selectedPlanet.code}`
      : ''
    history.push(`/characters/create${planetCodeParam}`)
  }, [selectedPlanet, history])

  return openCharactersForm
}
