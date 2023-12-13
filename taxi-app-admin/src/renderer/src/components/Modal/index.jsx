import Button from '../button'

function Modal({ text, exitModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex right">
          <Button className="btn" onClick={exitModal}>
            X
          </Button>
        </div>
        <h3>{text}</h3>
      </div>
    </div>
  )
}

export default Modal
