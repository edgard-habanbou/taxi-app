import { useState } from "react";
import { useDispatch } from "react-redux";

import "./index.css";
import { authActions } from "../../store/auth";
import TextInput from "../input";

import axios from "axios";

const Auth = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("1");
  const [role_id, setRole] = useState("2");

  const loginHandler = async (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("jwt", res.data.authorisation.token);
        const auth = JSON.stringify(res.data.user);
        localStorage.setItem("user", auth);
        console.log(auth);
        dispatch(authActions.login());
      })
      .catch((err) => {
        alert("Invalid username or password");
        setEmail("");
        setPassword("");
        return;
      });
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/register",
        { fname, lname, gender, role_id, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("jwt", res.data.authorisation.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(authActions.login());
      })
      .catch((err) => {
        alert("Invalid username or password");
        // setEmail("");
        // setPassword("");
        return;
      });
  };

  const toggleSignUpHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(role_id);
  };

  return (
    <div className={"auth"}>
      <form onSubmit={isSignUp ? signUpHandler : loginHandler}>
        {isSignUp ? (
          <>
            <TextInput
              placeholder="First Name"
              value={fname}
              onChange={handleFirstNameChange}
            />
            <TextInput
              placeholder="Last Name"
              value={lname}
              onChange={handleLastNameChange}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="flex column center">
              <div className="flex center">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    onChange={handleGenderChange}
                  />
                  Female
                </label>
              </div>
              <div className="flex center">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="2"
                    onChange={handleRoleChange}
                  />
                  Passenger
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="3"
                    onChange={handleRoleChange}
                  />
                  Driver
                </label>
              </div>
            </div>
            <button>Sign Up</button>
            <p>
              Already have an account?
              <a href="#" onClick={toggleSignUpHandler}>
                Sign In
              </a>
            </p>
          </>
        ) : (
          <>
            <TextInput
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
            />

            <TextInput
              placeholder="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button>Login</button>
            <p>
              Forgot Password? <a href="#">Reset Password</a>
            </p>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={toggleSignUpHandler}>
                Sign Up
              </a>
            </p>
          </>
        )}
      </form>
    </div>
  );
};
export default Auth;
