import './index.css'
import Button from '../button'
import taxiImage from '../../assets/images/taxi.png'

const Header = () => {
  const logoutHandler = () => {
    console.log('logout')
  }
  const isAuth = true

  return (
    <header className="header">
      <div>
        <img src={taxiImage} alt="" />
      </div>

      {isAuth && (
        <nav>
          <ul>
            <li>
              <Button className="grey">Profile</Button>
            </li>
            <li>
              <Button className="grey">Rides</Button>
            </li>
            <li>
              <Button className="red" onClick={logoutHandler}>
                Log Out
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
