import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { authActions } from "../../store/auth";
import Button from "../button";
import taxiImage from "../../assets/images/taxi.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const roleId = user?.role_id;

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch(authActions.logout());
    navigate("/");
  };

  const GoToProfile = () => {
    navigate("/userprofile");
  };

  const GoToRide = () => {
    if (roleId == 2) {
      navigate("/driver");
    } else {
      navigate("/passenger");
    }
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
              <Button className="grey" onClick={GoToProfile}>
                Profile
              </Button>
            </li>
            <li>
              <Button className="grey" onClick={GoToRide}>
                Rides
              </Button>
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
