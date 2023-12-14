import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserP = ({ fname, lname, email, gender, image }) => {
  const Loading = false;
  const genderText = gender === 1 ? "Male" : "Female";
  const [file, setFile] = useState();
  const navigate = useNavigate();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function navigateEditProfile() {
    navigate("/EditProfile");
  }

  function navigateSupport() {
    navigate("/Support");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8000/api/update_picture";
    const formData = new FormData();
    formData.append("image_url", file);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="user-profile-container">
          {Loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
          <div className="left-container">
            <img
              src={`http://localhost:8000${image}`}
              alt="User"
              className="image"
            />
            <input type="file" onChange={handleChange} />
            <button type="submit" className="change-profile-button">
              Change profile
            </button>
            <button
              className="change-profile-button"
              onClick={navigateEditProfile}
            >
              Edit Profile
            </button>
            <button className="change-profile-button" onClick={navigateSupport}>
              Support
            </button>
          </div>

          <div className="right-container  design">
            <div className="input-container">
              <label>First Name:</label>
              <input value={fname} className="fname" />
              <label>Email:</label>
              <input value={email} className="email" />
            </div>

            <div className="input-container">
              <label>Last Name:</label>
              <input value={lname} className="lname" />
              <label>Gender:</label>
              <input value={genderText} className="gender" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserP;
