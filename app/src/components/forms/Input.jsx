import { forwardRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { capitalize } from '../../helpers'

const InputStyles = styled.div`
  margin-bottom: 2rem;

  label {
    p {
      font-weight: 600;
      opacity: 1;
      margin-bottom: 1rem;
    }

    textarea,
    input {
      background: var(--gray);
      border: 0;
      border-radius: var(--border-radius);
      width: 100%;
      max-width: 100%;
      padding: 1rem;
    }
  }

  .caption {
    margin-top: 1rem;
  }
`

const Input = forwardRef(
  ({ name, type, label, caption, error, ...props }, ref) => {
    return (
      <InputStyles>
        <label htmlFor={name}>
          <p>{label}</p>
          {type === 'textarea' ? (
            <textarea
              name={name}
              aria-invalid={error ? 'true' : 'false'}
              ref={ref}
              rows={4}
              {...props}
            ></textarea>
          ) : (
            <input
              name={name}
              aria-invalid={error ? 'true' : 'false'}
              ref={ref}
              type={type}
              {...props}
            />
          )}
        </label>
        {caption && <p className="caption">{caption}</p>}
        {error && <span role="alert">{capitalize(error)}</span>}
      </InputStyles>
    )
  }
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  caption: PropTypes.string,
  error: PropTypes.string,
}

export default Input
