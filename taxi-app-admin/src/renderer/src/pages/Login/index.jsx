import { useState } from 'react'

import './index.css'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'

const Login = () => {
  const loginHandler = (event) => {
    console.log('login')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="auth">
      <form onSubmit={loginHandler}>
        <TextInput placeholder="email" value={email} onChange={handleEmailChange} />

        <TextInput
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="flex center">
          <Button onClick={loginHandler} className="btn grey">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Login
