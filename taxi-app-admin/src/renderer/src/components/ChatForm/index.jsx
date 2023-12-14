import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import axios from 'axios'

import './index.css'

const ChatForm = ({ user, onMessageSent, admin_chat_id, goToMain }) => {
  const [newMessage, setNewMessage] = useState('')
  user = JSON.parse(user)
  const sendMessage = () => {
    onMessageSent({
      user: user,
      fname: user.fname,
      lname: user.lname,
      message: newMessage,
      admin_chat_id: admin_chat_id
    })
    setNewMessage('')
  }
  const concludeChat = () => {
    axios
      .post(
        `http://localhost:8000/api/concludeChat`,
        {
          admin_chat_id: admin_chat_id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      )
      .catch((error) => {
        console.error('Error sending message:', error)
      })
      .finally(() => {
        goToMain()
      })
  }

  return (
    <div className="input-group">
      <input
        id="btn-input"
        type="text"
        name="message"
        className="input"
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
      />
      <div className="flex gap">
        <span className="flex center">
          <Button className="btn green" onClick={sendMessage}>
            Send
          </Button>
        </span>
        <span className="flex center">
          <Button className="btn red" onClick={concludeChat}>
            Conclude
          </Button>
        </span>
      </div>
    </div>
  )
}

ChatForm.propTypes = {
  user: PropTypes.string,
  onMessageSent: PropTypes.func,
  admin_chat_id: PropTypes.number
}
export default ChatForm
