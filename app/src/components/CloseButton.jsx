import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from './icons/CloseIcon'

const CloseButtonStyles = styled.button`
  position: relative;
  color: var(--primary);
  background-color: rgba(18, 28, 51, 0.1);
  height: 4rem;
  width: 4rem;

  svg {
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
  }
`

export default function CloseButton({ onClick }) {
  return (
    <CloseButtonStyles onClick={onClick}>
      <CloseIcon />
    </CloseButtonStyles>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
