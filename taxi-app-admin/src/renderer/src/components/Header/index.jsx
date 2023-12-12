import './index.css'
import Button from '../button'
import taxiImage from '../../assets/images/taxi.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const navigateTo = (index) => {
    if (index === 0) {
      navigate('/user-management')
    } else if (index === 1) {
      navigate('/stats')
    } else if (index === 2) {
      navigate('/support')
    }
  }
  const logoutHandler = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <header className="header">
      <div>
        <img src={taxiImage} alt="" />
      </div>

      {
        <nav>
          <ul>
            <li>
              <Button
                onClick={() => {
                  navigateTo(0)
                }}
                className="grey"
              >
                User Managment
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigateTo(1)
                }}
                className="grey"
              >
                Stats
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigateTo(2)
                }}
                className="grey"
              >
                Support
              </Button>
            </li>
            <li>
              <Button className="red" onClick={logoutHandler}>
                Log Out
              </Button>
            </li>
          </ul>
        </nav>
      }
    </header>
  )
}

export default Header
