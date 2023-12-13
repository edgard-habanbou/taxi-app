import Button from '../button'
import PropTypes from 'prop-types'

function SupportChats({ chat, index }) {
  return (
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
          <Button className={'btn green'}>Go to chat</Button>
        </div>
      </div>
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
