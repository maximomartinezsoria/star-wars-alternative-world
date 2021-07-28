import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from '../IconButton'
import LoadingAndErrorState from '../LoadingAndErrorState'

const CardsListStyles = styled.section`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  h3 {
    opacity: 0.6;
    text-transform: uppercase;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

export default function SidebarCharactersList({
  title,
  onPlusButtonClick,
  children,
  queryInfo: { loading, error, hasCharacters },
  emptyText,
}) {
  return (
    <CardsListStyles>
      <div>
        <h3>{title}</h3>
        {onPlusButtonClick && (
          <IconButton
            icon="add"
            shape="squared"
            theme="light"
            onClick={onPlusButtonClick}
          />
        )}
      </div>

      {loading || error ? (
        <LoadingAndErrorState error={!!error} />
      ) : hasCharacters ? (
        <ul>{children}</ul>
      ) : (
        <p>{emptyText}</p>
      )}
    </CardsListStyles>
  )
}

SidebarCharactersList.propTypes = {
  title: PropTypes.string.isRequired,
  onPlusButtonClick: PropTypes.func.isRequired,
  emptyText: PropTypes.string.isRequired,
  queryInfo: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    hasCharacters: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node,
}
