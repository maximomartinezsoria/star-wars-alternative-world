import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardStyles = styled.article`
  border-radius: 16px;
  transition: background-color 0.1s ease-in;
  background-color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  figure {
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    padding-bottom: 65%;
    margin: 0;

    img {
      border-radius: 16px 16px 0 0;
      width: 100%;
      object-fit: cover;
      object-position: center;
      position: absolute;
      height: 100%;
      max-width: 100%;
    }
  }

  &:hover {
    background-color: var(--gray);
  }
`

const TextContainerStyles = styled.div`
  padding: 0.8rem 1.6rem 1.6rem;

  p {
    font-size: 1.2rem;
    opacity: 0.5;
  }
`

export default function Card({ title, image, text }) {
  return (
    <CardStyles>
      <figure>
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
  title: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
}