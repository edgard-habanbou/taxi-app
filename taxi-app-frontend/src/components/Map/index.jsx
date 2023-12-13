import "./index.css";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// const center = { lat: 48.8584, lng: 2.2945 }

function Map({ markers }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrhII-mQc39L3nwNAehHSXWBpQ6IHpm2I",
    libraries: ["places"],
  });
  const [center, setCenter] = useState({ lat: 33.8938, lng: 35.5018 });
  const [origin, setOrigin] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [usertype, setUsertype] = useState(2);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("jwt");
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const sendUserLocation = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update_location",
        { latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createRequest = async (origin, destination) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-requests/create",
        { origin, destination },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGeo = async () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if (origin) {
            const latitude = `${origin.lat}`;
            const longitude = `${origin.lng}`;
            sendUserLocation(latitude, longitude);
          }
        },
        error,
        options
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      getGeo();
      console.log(origin);
    }, 10000);

    return () => clearInterval(interval);
  }, [count]);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return <></>;
  }

  async function calculateRoute() {
    const start =
      origin == null
        ? originRef.current.value === ""
          ? center
          : originRef.current.value
        : origin;
    console.log(start);

    if (destinationRef.current.value === "" || start === "") {
      return;
    }

    console.log(origin);
    console.log(destinationRef.current.value);
    console.log(originRef.current.value);

    createRequest(start, destinationRef.current.value);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: start,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div className="section-container">
      {usertype == 2 ? (
        <div className="user-box">
          <div>
            <div>
              <Autocomplete>
                <input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </div>
            <div>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>

            <div>
              <button type="submit" onClick={calculateRoute}>
                Calculate Route
              </button>
            </div>
          </div>
          <div>
            <p>Distance: {distance} </p>
            <p>Duration: {duration} </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="map-container">
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "70vh" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {markers &&
            markers.map((marker) => {
              return marker;
            })}
          {origin && <Marker position={origin} label={"me"}></Marker>}

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
