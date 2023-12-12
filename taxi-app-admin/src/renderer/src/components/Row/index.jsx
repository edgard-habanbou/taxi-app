import PropTypes from 'prop-types'
import Button from '../Button'
import axios from 'axios'
import './index.css'
import { useState } from 'react'

function Row({ user: { id, fname, lname }, stats, index }) {
  const [Loading, setLoading] = useState(false)

  const handleStatusUpdate = (acceptedValue) => {
    setLoading(true)

    axios
      .post(
        'http://localhost:8000/api/update_status',
        {
          id: id,
          accepted: acceptedValue,
          busy: 0
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        alert(res.data.message)
        window.location.reload()
      })
      .catch(() => {
        alert('Something went wrong!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleAccept = () => {
    handleStatusUpdate(1)
  }

  const handleReject = () => {
    handleStatusUpdate(-1)
  }

  return (
    <div className="flex space-between center full-width driver">
      {Loading && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="username flex gap">
        <div>
          <p>{index + 1}</p>
        </div>
        <div>
          <p>{fname + ' ' + lname}</p>
        </div>
      </div>
      {!stats && (
        <div className="flex gap right">
          <div>
            <Button className={'btn green'} onClick={handleAccept}>
              Accept
            </Button>
          </div>
          <div>
            <Button className={'btn red'} onClick={handleReject}>
              Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

Row.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    fname: PropTypes.string,
    lname: PropTypes.string
  }),
  stats: PropTypes.bool,
  index: PropTypes.number
}

export default Row
