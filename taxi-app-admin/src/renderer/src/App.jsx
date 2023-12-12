import Login from './pages/Login/index'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
