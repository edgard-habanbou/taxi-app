import { useState } from 'react'
import axios from 'axios'

import './index.css'
import TextInput from '../../components/InputText'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() // Use useHistory hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = () => {
    if (email == '' || password == '') {
      alert('Please enter your email and password')
      return
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
          console.log(res)
          if (res.data.user.role_id == 1) {
            localStorage.setItem('jwt', res.data.authorisation.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/home')
          } else {
            alert('Unauthorized')
            setEmail('')
            setPassword('')
            return
          }
        })
        .catch(() => {
          alert('Invalid username or password')
          setEmail('')
          setPassword('')
          return
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  return (
    <div className="auth">
      <div className="form">
        <TextInput placeholder="email" value={email} onChange={handleEmailChange} />

        <TextInput
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="flex center">
          <Button
            onClick={loginHandler}
            className={`btn ${loading ? 'grey' : ''}`}
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
