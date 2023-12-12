import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
function App() {
  return (
    <Router>
      <Header />
      <div className="">
        <Routes></Routes>
      </div>
    </Router>
  )
}

export default App
