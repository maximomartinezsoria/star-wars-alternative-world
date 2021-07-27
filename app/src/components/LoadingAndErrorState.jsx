import styled from 'styled-components'
import PropTypes from 'prop-types'
import PlanetLoader from './icons/PlanetLoader'

const LoadingAndErrorStates = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;

  p {
    margin-top: 4rem;
  }
`

export default function LoadingAndErrorState({ error }) {
  return (
    <LoadingAndErrorStates>
      <PlanetLoader />
      {error && <p>Oops, something went wrong!</p>}
    </LoadingAndErrorStates>
  )
}

LoadingAndErrorState.propTypes = {
  error: PropTypes.bool,
}
