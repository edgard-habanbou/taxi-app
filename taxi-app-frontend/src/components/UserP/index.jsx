import React from "react";
import "./style.css";

const UserP = ({ fname, lname, email, gender, image }) => {
  return (
    <div className="user-profile-container">

      <div className="left-container">
        <img src={image} alt="User" className="image" />
        <button className="change-profile-button">Change profile</button>
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
                <input value={gender} className="gender" />
            </div>
      </div>
    </div>
  );
};

export default UserP;
