import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from '../IconButton'

const SidebarHeaderStyles = styled.header`
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
`

export default function SidebarHeader({ title, text, onClose }) {
  return (
    <SidebarHeaderStyles>
      <IconButton
        onClick={onClose}
        icon="times"
        shape="squared"
        theme="light"
        className="close-button"
      />
      <h2>{title}</h2>
      <p>{text}</p>
    </SidebarHeaderStyles>
  )
}

SidebarHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}
