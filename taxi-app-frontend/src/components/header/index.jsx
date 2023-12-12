import { useSelector, useDispatch } from "react-redux";

import "./index.css";
import { authActions } from "../../store/auth";
import Button from "../button";
import taxiImage from "../../assets/images/taxi.png";

const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch(authActions.logout());
  };

  return (
    <header className="header">
      <div>
        <img src={taxiImage} alt="" />
      </div>

      {isAuth && (
        <nav>
          <ul>
            <li>
              <Button className="grey">Profile</Button>
            </li>
            <li>
              <Button className="grey">Rides</Button>
            </li>
            <li>
              <Button className="red" onClick={logoutHandler}>
                Log Out
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
