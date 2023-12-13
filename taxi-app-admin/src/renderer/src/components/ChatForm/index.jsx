import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

import './index.css'

const ChatForm = ({ user, onMessageSent, admin_chat_id }) => {
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
      <span className="flex center">
        <Button className="btn green" onClick={sendMessage}>
          Send
        </Button>
      </span>
    </div>
  )
}

ChatForm.propTypes = {
  user: PropTypes.string,
  onMessageSent: PropTypes.func
}
export default ChatForm
