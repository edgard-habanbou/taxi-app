import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import axios from 'axios'
import Row from '../../components/Row'
import './index.css'
function Stats() {
  const [Loading, setLoading] = useState(false)
  const [stats, setStats] = useState([])
  const [driverRating, setDriverRating] = useState([])
  const getStats = () => {
    setLoading(true)
    axios
      .post(
        'http://localhost:8000/api/getstats',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      )
      .then((res) => {
        setStats(res.data.data)
        setDriverRating(res.data.data.driverAverageRatings)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getStats()
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
        <div className="flex wrapper column center gap seventy">
          <div className="flex row gap wrap">
            <div>
              <p>
                <b>Total Rides:</b> {stats.rides}
              </p>
            </div>
            <div>
              <p>
                <b>Total Drivers:</b> {stats.drivers}
              </p>
            </div>
            <div>
              <p>
                <b>Busy Drivers:</b> {stats.busy}
              </p>
            </div>
          </div>
          <div className=" full-width full-height flex gap column">
            <div>
              <h2>Drivers Average Rating</h2>
            </div>
            <div className="content flex column full-width gap">
              {driverRating?.map((user, index) => {
                return <Row key={index} index={index} stats={true} user={user}></Row>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
