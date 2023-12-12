import PropTypes from 'prop-types'
import './index.css'
const TextInput = ({ placeholder, onChange, type = 'text' }) => {
  return (
    <div className="input-wrapper">
      <input type={type} className="modern-input" placeholder={placeholder} onChange={onChange} />
    </div>
  )
}
TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}
export default TextInput
