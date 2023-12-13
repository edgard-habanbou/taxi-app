import React, { useEffect } from "react";
import "./index.css";
import MapController from "../../components/MapController";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
const Driver = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const localUser = localStorage.getItem("jwt");

  const verify = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const user = response.data;
      dispatch(
        authActions.setUser({
          role_id: localUser.role_id,
          latitude: localUser.latitude,
          longitude: localUser.longitude,
        })
      );
      // Do something with the user object
    } catch (error) {
      console.error(error);
      dispatch(authActions.setUser(null));
      dispatch(authActions.logout());
      navigate("/");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? <MapController userType={3}></MapController> : <p>forbidden</p>}
    </>
  );
};

export default Driver;
