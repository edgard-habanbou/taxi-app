import { useState } from 'react'
import PropTypes from 'prop-types'

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
        className="form-control input-sm"
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
      />
      <span className="input-group-btn">
        <button className="btn btn-primary btn-sm" id="btn-chat" onClick={sendMessage}>
          Send
        </button>
      </span>
    </div>
  )
}

ChatForm.propTypes = {
  user: PropTypes.string,
  onMessageSent: PropTypes.func
}
export default ChatForm
