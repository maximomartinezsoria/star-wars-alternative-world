import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import SlideTransition from '../SlideTransition'

const SidebarStyles = styled.aside`
  width: 40rem;
  max-width: 90vw;
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
`

export default function Sidebar({ query, children, show = false }) {
  const queryResponse = useQuery(query.query, {
    variables: query.variables,
    skip: !show,
  })

  return (
    <SlideTransition condition={show}>
      <SidebarStyles>
        {children(queryResponse, {
          loading: queryResponse.loading,
          error: !!queryResponse.error,
        })}
      </SidebarStyles>
    </SlideTransition>
  )
}

Sidebar.propTypes = {
  query: PropTypes.shape({
    query: PropTypes.isRequired,
    variables: PropTypes.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export { default as SidebarHeader } from './SidebarHeader'
export { default as SidebarDescriptionList } from './SidebarDescriptionList'
export { default as SidebarCharactersList } from './SidebarCharactersList'
