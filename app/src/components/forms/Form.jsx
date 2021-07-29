import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormStyles = styled.form`
  .buttons-container {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 1.5rem;

      &[disabled] {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }

  span[role='alert'] {
    display: block;
    margin-top: 1rem;
    color: var(--red);

    &.mutation-error {
      margin-bottom: 3rem;
    }
  }
`

export default function Form({
  children,
  submitButtonLabel,
  cancelButton,
  mutationFailed,
  mutationLoading,
  entity,
  errorMessage,
  ...props
}) {
  return (
    <FormStyles {...props}>
      {children}
      {mutationFailed && (
        <span className="mutation-error" role="alert">
          {errorMessage
            ? errorMessage
            : `Bummer! We can’t create this ${entity} right now. Probably a black hole in the way. Try later please.`}
        </span>
      )}
      <div className="buttons-container">
        {cancelButton && (
          <button className="light" onClick={cancelButton.onClick}>
            {cancelButton.label}
          </button>
        )}
        <button type="submit" disabled={mutationLoading}>
          {submitButtonLabel}
        </button>
      </div>
    </FormStyles>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  submitButtonLabel: PropTypes.string.isRequired,
  cancelButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  mutationFailed: PropTypes.bool.isRequired,
  mutationLoading: PropTypes.bool.isRequired,
  entity: PropTypes.string,
  errorMessage: PropTypes.string,
}
