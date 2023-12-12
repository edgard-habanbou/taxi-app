import PropTypes from 'prop-types'

import './index.css'
const Button = ({ onClick, children, className = null }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}
export default Button
