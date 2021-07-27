import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from '../IconButton'

const ModalStyles = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  padding: 9.6rem 4.8rem 4.8rem;
  background-color: var(--white);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  width: 80rem;
  max-width: 100%;

  .title {
    margin-bottom: 1.5rem;
  }

  .close-button {
    position: absolute;
    top: 5rem;
    right: 5rem;
  }
`

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null
  return (
    <ModalStyles>
      <IconButton
        icon="times"
        theme="light"
        shape="squared"
        onClick={onClose}
        className="close-button"
      />
      <h2 className="title h1">{title}</h2>
      {children}
    </ModalStyles>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
