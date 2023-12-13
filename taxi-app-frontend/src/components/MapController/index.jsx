import { useState } from "react";
import Map from "../Map";
import { Marker } from "@react-google-maps/api";

function MapController() {
  const markers = [
    <Marker
      key="1"
      position={{ lat: 33.8938, lng: 35.5018 }}
      label={"batata"}
    ></Marker>,
    <Marker
      key="2"
      position={{ lat: 33.8939, lng: 35.5018 }}
      label={"tata"}
    ></Marker>,
  ];

  return <>{/* <Map markers={markers}></Map> */}</>;
}

export default MapController;
