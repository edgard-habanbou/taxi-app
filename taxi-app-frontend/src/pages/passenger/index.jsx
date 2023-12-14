import React, { useEffect } from "react";
import "./index.css";
import MapController from "../../components/MapController";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Passenger = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.isAuthenticated);
  const role_id = useSelector((state) => state.auth.role_id);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const localUser = localStorage.getItem("user");

  const verify = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(authActions.setRole(2));
    } catch (error) {
      console.error(error);
      dispatch(authActions.setUser(null));
      dispatch(authActions.setRole(null));
      dispatch(authActions.logout());
      navigate("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {user && role_id == 2 ? (
        <MapController userType={2}></MapController>
      ) : (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Passenger;
