import { useState } from 'react'
import Button from '../button'
import PropTypes from 'prop-types'
import ChatM from '../../pages/ChatM'
import './index.css'

function SupportChats({ chat, index }) {
  const [showChat, setShowChat] = useState(false)
  function goToChat() {
    setShowChat(!showChat)
  }
  return (
    <div>
      {showChat ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <ChatM goToMain={goToChat} admin_chat_id={chat.id} />
          </div>
        </div>
      ) : (
        <div className="flex space-between center full-width driver">
          <div className="username flex gap">
            <div>
              <p>{index + 1}</p>
            </div>
            <div>
              <p>{chat.fname + ' ' + chat.lname}</p>
            </div>
          </div>
          <div className="flex gap right">
            <div>
              {/* Pass the function reference, don't call it */}
              <Button className={'btn green'} onClick={goToChat}>
                Go to chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

SupportChats.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    fname: PropTypes.string,
    lname: PropTypes.string,
    image_url: PropTypes.string
  }),
  index: PropTypes.number
}
export default SupportChats
