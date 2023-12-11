import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatM from "./pages/ChatM";
function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatM />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
