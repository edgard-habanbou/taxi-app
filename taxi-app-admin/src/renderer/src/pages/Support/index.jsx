import Header from '../../components/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SupportChats from '../../components/SupportChats'
function Support() {
  const [chats, setChats] = useState([])
  const [Loading, setLoading] = useState([])

  const fetchChats = () => {
    setLoading(true)
    axios
      .post(
        `http://localhost:8000/api/fetch_chats`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      )
      .then((response) => {
        setChats(response.data)
      })
      .catch((error) => {
        console.error('Error fetching messages:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchChats()
    console.log(chats)
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
        <div className="wrapper flex gap column">
          <div>
            <h2>Support Requests</h2>
          </div>
          <div className="content flex column full-width gap">
            {chats?.map((chat, index) => (
              <SupportChats chat={chat} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
