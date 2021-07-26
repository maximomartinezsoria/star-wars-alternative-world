import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimesIcon from './icons/TimesIcon'
import AddIcon from './icons/AddIcon'

const IconButtonStyles = styled.button`
  position: relative;

  svg {
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
  }

  &.light {
    color: var(--primary);
    background-color: rgba(18, 28, 51, 0.1);
    height: 4rem;
    width: 4rem;
  }

  &.dark {
    svg {
      fill: var(--white);
    }
  }

  &.rounded {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
  }

  &.squared {
    padding: 0;
  }
`

const iconComponents = {
  add: AddIcon,
  times: TimesIcon,
}

export default function IconButton({ theme, icon, shape, ...props }) {
  const Icon = iconComponents[icon]

  return (
    <IconButtonStyles className={`${shape} ${theme}`} {...props}>
      <Icon />
    </IconButtonStyles>
  )
}

IconButton.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  icon: PropTypes.oneOf(['add', 'times']).isRequired,
  shape: PropTypes.oneOf(['squared', 'rounded']).isRequired,
}
