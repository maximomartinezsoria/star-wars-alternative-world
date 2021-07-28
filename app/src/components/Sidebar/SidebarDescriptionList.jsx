import styled from 'styled-components'
import PropTypes from 'prop-types'

const SidebarDescriptionListStyles = styled.dl`
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
`

export default function SidebarDescriptionList({ children }) {
  return <SidebarDescriptionListStyles>{children}</SidebarDescriptionListStyles>
}

SidebarDescriptionList.propTypes = {
  children: PropTypes.node.isRequired,
}
