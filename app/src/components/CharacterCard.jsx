import PropTypes from 'prop-types'
import styled from 'styled-components'

const CharacterCardStyles = styled.article`
  display: flex;

  figure {
    width: 25%;
    padding-bottom: 25%;
    margin-right: 1.5rem;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export default function CharacterCard({ character }) {
  return (
    <CharacterCardStyles>
      <figure className="image-container">
        <img src={character.pictureUrl} alt={character.name} />
      </figure>
      <div>
        <h4>{character.name}</h4>
        <p>{character.description}</p>
      </div>
    </CharacterCardStyles>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    pictureUrl: PropTypes.string.isRequired,
  }),
}
