import PropTypes from 'prop-types'
import Button from '../Button'
import './index.css'

function Row({ user, stats }) {
  const handleAccept = () => {}
  const handleReject = () => {}
  return (
    <div className="flex space-between center full-width driver">
      <div className="username">
        <p>{user.fname + ' ' + user.lname}</p>
      </div>
      {!stats && (
        <div className="flex gap right">
          <div>
            <Button
              className={'btn green'}
              onClick={() => {
                handleAccept()
              }}
            >
              Accept
            </Button>
          </div>
          <div>
            <Button
              className={'btn red'}
              onClick={() => {
                handleReject()
              }}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

Row.propTypes = {
  user: PropTypes.string,
  stats: PropTypes.bool
}

export default Row
