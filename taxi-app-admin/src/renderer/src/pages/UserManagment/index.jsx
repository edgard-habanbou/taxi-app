import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import Row from '../../components/Row'
import './index.css'
import axios from 'axios'

function UserManagment() {
  const [PendingDrivers, setPendingDrivers] = useState()
  const [Loading, setLoading] = useState(false)

  const fetchPendingDrivers = () => {
    setLoading(true)
    axios
      .post(
        'http://localhost:8000/api/getpendingdrivers',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        setPendingDrivers(res.data)
      })
      .catch(() => {
        alert('Something went wrong!')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchPendingDrivers()
  }, [])
  return (
    <div>
      {Loading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : (
        ''
      )}
      <Header />
      <div className="flex full-page center">
        <div className="wrapper">
          <div className="content flex column full-width gap">
            {PendingDrivers?.map((user, index) => {
              return <Row key={index} index={index} user={user}></Row>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagment
