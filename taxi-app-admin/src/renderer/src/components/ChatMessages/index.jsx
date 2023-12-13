// components/ChatMessages.jsx
import PropTypes from 'prop-types'
import './index.css'

const ChatMessages = ({ messages }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <ul className="chat">
      {messages.map((message, index) => {
        let user_id = message.user_id
        const isCurrentUser = user_id === user.id ? 'right' : 'left'
        return (
          <li className={isCurrentUser} key={index}>
            <div className="clearfix">
              <div className="message-info">
                <div className="pp">
                  <img className="user-image" src={message.image_url} />
                </div>
                <div className="user">
                  <p>{message.fname + ' ' + message.lname}</p>
                </div>
              </div>
              <p>{message.message}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

ChatMessages.propTypes = {
  messages: PropTypes.array
}
export default ChatMessages
