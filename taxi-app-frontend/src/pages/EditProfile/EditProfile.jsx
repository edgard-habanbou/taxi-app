import React, { useState } from "react";
import axios from "axios";
import "./style.css"
function EditProfile() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  
    function handleChange(event) {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const url = "http://localhost:8000/api/update_profile";
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
  
      const data = new FormData();
      data.append('fname', formData.firstName);
      data.append('lname', formData.lastName);
      data.append('email', formData.email);
      data.append('password', formData.password);
  
      axios.post(url, data, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    return (
    <div className="ep-container">
      <form onSubmit={handleSubmit}>
        {/* {Loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            ''
          )} */}
        <div className="user-profile-container">
          <div className="right-container design">
            <div className="input-container">
              <label>First Name:</label>
              <input
                className="fname"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label>Email:</label>
              <input
                className="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
  
            <div className="input-container">
              <label>Last Name:</label>
              <input
                className="lname"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label>Password:</label>
              <input
                className="gender"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className='change-profile-button left' type="submit">Edit Profile</button>
          </div>
        </div>
      </form>
      </div>
    );
  }
  
  export default EditProfile;