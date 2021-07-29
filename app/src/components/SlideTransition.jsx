import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

const duration = 300

const defaultStyle = {
  position: 'fixed',
  transition: `transform ${duration}ms ease-in-out`,
  background: 'transparent',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%) translateX(100%)',
}

const enter = { transform: 'translateY(-50%) translateX(-2rem)' }
const exit = { transform: 'translateY(-50%) translateX(100%)' }

const transitionStyles = {
  entering: enter,
  entered: enter,
  exiting: exit,
  exited: exit,
}

function SlideTransition({ children, condition, ...props }) {
  const nodeRef = useRef(null)

  return (
    <Transition nodeRef={nodeRef} in={condition} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          {...props}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

SlideTransition.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.bool.isRequired,
}

export default SlideTransition
