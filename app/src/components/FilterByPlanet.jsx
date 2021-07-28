import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import GET_PLANETS from '../queries/getPlanets'

const SelectContainerStyles = styled.div`
  width: 15rem;
  max-width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`

const defaultValue = {
  label: 'Planet: All',
  value: null,
}

export default function FilterByPlanet({ setPlanet }) {
  const { data } = useQuery(GET_PLANETS)

  return (
    <SelectContainerStyles>
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--dark-gray)',
            borderColor: 'var(--dark-gray)',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'var(--black)',
            fontWeight: '600',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: 'var(--black)',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            width: 0,
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--primary)',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 'var(--border-radius)',
          colors: {
            ...theme.colors,
            primary25: 'var(--gray)',
            primary: 'var(--primary)',
            primary50: 'var(--dark-gray)',
          },
        })}
        isSearchable={false}
        options={[
          defaultValue,
          ...(data?.planets.nodes.map((planet) => ({
            label: `Planet: ${planet.name}`,
            value: planet.id,
          })) || []),
        ]}
        defaultValue={defaultValue}
        onChange={(e) => {
          setPlanet(e.value)
        }}
      />
    </SelectContainerStyles>
  )
}

FilterByPlanet.propTypes = {
  setPlanet: PropTypes.func.isRequired,
}
