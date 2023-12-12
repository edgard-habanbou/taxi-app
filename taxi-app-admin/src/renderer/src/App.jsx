import Login from './pages/Login/index'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
