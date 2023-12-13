import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatM from "./pages/ChatM";
import UserProfile from "./pages/UserProfile"
function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatM />} />
          <Route path="/userprofile" element={<UserProfile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
