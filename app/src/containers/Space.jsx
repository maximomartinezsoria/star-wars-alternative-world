import Layout from '../components/Layout'
import PlanetLoader from '../components/icons/PlanetLoader'
import styled from 'styled-components'

const SpaceEmptyStateStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;

  svg {
    margin-bottom: 4rem;
  }

  h2 {
    margin-bottom: 2.4rem;
  }
`

export default function Space() {
  return (
    <Layout title="Space">
      <SpaceEmptyStateStyles>
        <PlanetLoader />
        <h2>Space doesn't have to be so empty.</h2>
        <button>Create Planet</button>
      </SpaceEmptyStateStyles>
    </Layout>
  )
}
