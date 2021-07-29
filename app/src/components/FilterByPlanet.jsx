import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'react-select'
import { useQuery } from '@apollo/client'
import GET_PLANET_NAMES from '../queries/getPlanetNames'

const SelectContainerStyles = styled.div`
  width: 15rem;
  max-width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`

const pageSize = 10
export default function FilterByPlanet({ setPlanet }) {
  const [options, setOptions] = useState([])
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const { data, fetchMore } = useQuery(GET_PLANET_NAMES, {
    variables: { planetName: inputValue, page: 1, pageSize },
  })
  const timeout = useRef(null)

  const onInputChange = (planetName, { action }) => {
    if (action === 'input-blur') {
      setInputValue(value ? value.label : '')
    }
    if (action === 'input-change') {
      setInputValue(planetName)
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        fetchMore({ variables: { planetName, page: 1, pageSize } })
      }, 300)
    }
  }

  const onMenuScrollToBottom = () => {
    const currentPage = data?.planets.pagination.page
    const totalResults = data?.planets.pagination.total
    const totalPages = Math.ceil(totalResults / pageSize)
    if (currentPage >= totalPages) return
    fetchMore({
      variables: { planetName: inputValue, page: currentPage + 1, pageSize },
    })
  }

  const onChange = (option) => {
    setValue(option)
    setPlanet(
      option ? data?.planets.nodes.find(({ id }) => id === option.value) : null
    )
  }

  useEffect(() => {
    const newOptions = data?.planets.nodes.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
    if (newOptions) setOptions(newOptions)
  }, [data])

  return (
    <SelectContainerStyles className="FilterByPlanet">
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
        placeholder={'Planet: All'}
        onInputChange={onInputChange}
        onMenuScrollToBottom={onMenuScrollToBottom}
        options={options}
        inputValue={inputValue}
        onChange={onChange}
        value={value}
        setValue={setValue}
        isClearable={true}
      />
    </SelectContainerStyles>
  )
}

FilterByPlanet.propTypes = {
  setPlanet: PropTypes.func.isRequired,
}
