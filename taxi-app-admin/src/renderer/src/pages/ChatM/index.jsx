import { useState, useEffect } from 'react'
import axios from 'axios'
import Chat from '../../components/Chat'
import Button from '../../components/button'

const ChatM = ({ admin_chat_id, goToMain }) => {
  const [messages, setMessages] = useState([])

  const fetchMessages = () => {
    axios
      .post(
        `http://localhost:8000/api/support`,
        {
          admin_chat_id: admin_chat_id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      )
      .then((response) => {
        setMessages(response.data)
      })
      .catch((error) => {
        console.error('Error fetching messages:', error)
      })
  }

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])

    axios
      .post(`http://localhost:8000/api/send_support_message`, message, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error sending message:', error)
      })
  }
  useEffect(() => {
    fetchMessages()
    setInterval(() => {
      fetchMessages()
    }, 2000)
  }, [])
  return (
    <div>
      <div>
        <Button className="btn" onClick={goToMain}>
          Back
        </Button>
      </div>
      <Chat
        messages={messages}
        addMessage={addMessage}
        admin_chat_id={admin_chat_id}
        user={localStorage.getItem('user')}
      />
    </div>
  )
}

export default ChatM
