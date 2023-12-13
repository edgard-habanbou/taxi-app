import { useState } from 'react'
import axios from 'axios'
import Modal from '../../components/Modal'

import './index.css'
import TextInput from '../../components/InputText'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalText, setModalText] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }
  const loginHandler = () => {
    if (email == '' || password == '') {
      setModalText('Please enter email and password')
      setShowModal(true)
    } else {
      setLoading(true)
      axios
        .post(
          'http://localhost:8000/api/login',
          {
            email,
            password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          if (res.data.user.role_id == 1) {
            localStorage.setItem('jwt', res.data.authorisation.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/user-management')
          } else {
            setModalText('You are not authorized to access this page')
            setShowModal(true)
          }
        })
        .catch(() => {
          setModalText('Invalid username or password')
          setShowModal(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  return (
    <div className="auth">
      {showModal && <Modal text={modalText} exitModal={() => setShowModal(false)} />}
      <div className="flex center">
        <h2>Login</h2>
      </div>
      <div className="form flex column gap">
        <TextInput
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyPress}
        />

        <TextInput
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleKeyPress}
        />
        <div className="flex center">
          <Button
            onClick={loginHandler}
            className={`btn green ${loading ? 'grey' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login
