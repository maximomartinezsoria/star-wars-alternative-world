import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardStyles = styled.article`
  border-radius: 16px;
  transition: background-color 0.1s ease-in;
  background-color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &.selected {
    border: 2px solid var(--primary);
  }

  &:hover {
    background-color: var(--gray);
  }

  figure.image-container img {
    border-radius: 16px 16px 0 0;
  }
`

const TextContainerStyles = styled.div`
  padding: 0.8rem 1.6rem 1.6rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
  }
`

export default function Card({
  title,
  image,
  text,
  onClick = () => {},
  className = '',
}) {
  return (
    <CardStyles className={className} onClick={onClick}>
      <figure className="image-container">
        <img src={image} alt={title} />
      </figure>
      <TextContainerStyles>
        <h3>{title}</h3>
        <p>{text}</p>
      </TextContainerStyles>
    </CardStyles>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}
