import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CharacterCard from './CharacterCard'
import IconButton from './IconButton'
import LoadingAndErrorState from './LoadingAndErrorState'

const SidebarStyles = styled.aside`
  position: fixed;
  top: 3rem;
  right: 0;
  width: 40rem;
  max-width: 100%;
  min-height: 90vh;
  max-height: 100vh;
  background-color: var(--white);
  padding: 8rem 3rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .close-button {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  & > p {
    margin-bottom: 2rem;
  }

  dl {
    display: flex;
    margin-bottom: 2.5rem;

    div {
      width: 50%;

      dt {
        margin-bottom: 0.5rem;
      }

      dd {
        font-weight: 600;
        margin: 0;
      }
    }
  }
`

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

export default function Sidebar({
  title,
  text,
  descriptionList,
  charactersListTitle,
  charactersQuery,
  onClose,
  onPlusButtonClick = null,
}) {
  const { data, loading, error } = useQuery(charactersQuery.query, {
    variables: charactersQuery.variables,
  })

  return (
    <SidebarStyles>
      <IconButton
        onClick={onClose}
        icon="times"
        shape="squared"
        theme="light"
        className="close-button"
      />
      <h2>{title}</h2>
      <p>{text}</p>
      <dl>
        {descriptionList.map(({ title, text }, idx) => (
          <div key={idx}>
            <dt>{title}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
      <CardsListStyles>
        <div>
          <h3>{charactersListTitle}</h3>
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
        ) : data.characters.nodes.length === 0 ? (
          <p>Looks like this planet is empty...</p>
        ) : (
          <ul>
            {data.characters.nodes.map((character) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        )}
      </CardsListStyles>
    </SidebarStyles>
  )
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  descriptionList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  charactersListTitle: PropTypes.string.isRequired,
  charactersQuery: PropTypes.shape({
    query: PropTypes.isRequired,
    variables: PropTypes.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onPlusButtonClick: PropTypes.func,
}
