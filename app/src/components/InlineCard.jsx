import PropTypes from 'prop-types'
import styled from 'styled-components'

const InlineCardStyles = styled.article`
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

export default function InlineCard({ title, text, image }) {
  return (
    <InlineCardStyles>
      <figure className="image-container">
        <img src={image} alt={title} />
      </figure>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </InlineCardStyles>
  )
}

InlineCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  image: PropTypes.string.isRequired,
}
