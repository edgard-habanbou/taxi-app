import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/header";
import Auth from "./components/Auth";
import UserProfile from "./components/userProfile/UserProfile";
import Passenger from "./pages/passenger";
import Driver from "./pages/driver";
import ChatM from "./pages/ChatM";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!isAuth && <Auth />}
                {isAuth && <UserProfile />}
              </>
            }
          ></Route>
          <Route path="/passenger" element={<Passenger />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/chat" element={<ChatM />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
