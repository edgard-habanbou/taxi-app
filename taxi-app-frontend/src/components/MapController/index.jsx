import { useEffect, useState } from "react";
import Map from "../Map";
import { Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";
const id = localStorage.getItem("requestId");

function MapController({ userType }) {
  const token = localStorage.getItem("jwt");
  const [marker, setmarker] = useState(null);

  const getDriverLocation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/driver-location",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(id);
      console.log(response.data.driver);
      if (response.data.driver) {
        setmarker(
          <Marker
            id={Math.random()}
            position={{
              lat: parseFloat(response.data.driver[0].latitude),
              lng: parseFloat(response.data.driver[0].longitude),
            }}
            label={"driver"}
          ></Marker>
        );
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      {
        <Map
          markers={marker}
          usertype={userType}
          driverLocation={getDriverLocation}
        ></Map>
      }
    </>
  );
}

export default MapController;
