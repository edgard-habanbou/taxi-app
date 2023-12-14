import React, { useEffect } from "react";
import "./index.css";
import MapController from "../../components/MapController";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
const Passenger = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.isAuthenticated);
  const role_id = useSelector((state) => state.auth.role_id);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const localUser = localStorage.getItem("user");

  const verify = async () => {
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
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {user && role_id == 2 ? (
        <MapController userType={2}></MapController>
      ) : (
        <p>forbidden</p>
      )}
    </>
  );
};

export default Passenger;
