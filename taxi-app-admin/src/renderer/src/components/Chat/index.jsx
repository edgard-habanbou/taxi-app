import ChatMessages from '../ChatMessages'
import ChatForm from '../ChatForm'
import PropTypes from 'prop-types'
import './index.css'

const Chat = ({ messages, addMessage, user, admin_chat_id }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <ChatMessages messages={messages} />
        </div>
        <div className="card-footer">
          <ChatForm onMessageSent={addMessage} user={user} admin_chat_id={admin_chat_id} />
        </div>
      </div>
    </div>
  )
}

Chat.propTypes = {
  messages: PropTypes.array,
  addMessage: PropTypes.func,
  user: PropTypes.object
}
export default Chat
