import { useState } from "react";
import { useDispatch } from "react-redux";

import "./index.css";
import { authActions } from "../../store/auth";
import TextInput from "../input";

const Auth = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());
  };

  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const toggleSignUpHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const signUpHandler = (event) => {
    event.preventDefault();
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
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={"auth"}>
      <form onSubmit={isSignUp ? signUpHandler : loginHandler}>
        {isSignUp ? (
          <>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
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
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="passenger"
                  checked={role === "passenger"}
                  onChange={handleRoleChange}
                />
                Passenger
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={role === "driver"}
                  onChange={handleRoleChange}
                />
                Driver
              </label>
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
