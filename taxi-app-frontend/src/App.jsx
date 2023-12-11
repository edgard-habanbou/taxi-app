import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter

import Header from "./components/header";
import Auth from "./components/Auth";
import UserProfile from "./components/userProfile/UserProfile";
import Passenger from "./pages/passenger";
import Driver from "./pages/driver";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

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
          <Route path="/passenger" element={<Passenger></Passenger>} />
          <Route path="/driver" element={<Driver></Driver>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
