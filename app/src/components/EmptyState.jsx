import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlanetLoader from './icons/PlanetLoader'

const EmptyStateStyles = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;

  svg {
    margin-bottom: 4rem;
  }

  h2 {
    margin-bottom: 2.4rem;
  }
`

export default function EmptyState({ entity, onClick }) {
  return (
    <EmptyStateStyles>
      <PlanetLoader />
      <h2>Space doesn't have to be so empty.</h2>
      <button onClick={onClick}>Create {entity}</button>
    </EmptyStateStyles>
  )
}

EmptyState.propTypes = {
  entity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
