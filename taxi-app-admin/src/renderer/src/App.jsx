import Login from './pages/Login/index'
import UserManagment from './pages/UserManagment'
import Stats from './pages/Stats'
import Support from './pages/Support'

import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-management" element={<UserManagment />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  )
}

export default App
