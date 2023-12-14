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
import RideRequests from "../RideRequests";

const libraries = ["places"];

function Map({ markers, usertype, passengers, driverLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDx2H1dZlL5-SlO8GlFDytxRZUh6sovXQc",
    libraries,
  });
  const [center, setCenter] = useState({ lat: 33.8938, lng: 35.5018 });
  const [origin, setOrigin] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState(0);
  const [rides, setRides] = useState([]);
  const [pass, setPass] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    getRequests();
  }, [count]);

  const geocodeLocation = (locationText) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: locationText }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject(new Error("Geocode was not successful"));
        }
      });
    });
  };

  const convertToLatLng = async (locationText) => {
    try {
      const coordinates = await geocodeLocation(locationText);
      return coordinates;
    } catch (error) {
      console.error("Error converting location to latlng:", error);
      const a = locationText.replace("{", "").replace("}", "");
      let b = a.split(",");
      const e = [];
      b.forEach((element) => {
        e.push(element.split(":"));
      });
      let jsonObject = {};

      e.forEach(([key, value]) => {
        jsonObject[key] = parseFloat(value);
      });
      console.log(jsonObject);
      return jsonObject;
    }
  };
  const getRequests = async () => {
    if (usertype == 2) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/User-Active-Requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const request = response.data;
        // console.log(request);
        setRides(response.data);

        // Do something with the user object
      } catch (error) {
        console.error(error);
      }
    } else {
      if (usertype == 3) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/all-requests",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const request = response.data;
          // console.log(request);
          setRides(response.data);
          const updatedData = Promise.all(
            response.data.map(async (item) => {
              const fixedOrigin = item.origin.replace(/\"/g, ""); // Remove escaped quotes
              const fixedDestination = item.destination.replace(/\"/g, "");

              // Convert locations to latlng
              const originLatLng = await convertToLatLng(fixedOrigin);
              const destinationLatLng = await convertToLatLng(fixedDestination);

              return {
                ...item,
                origin: originLatLng,
                destination: destinationLatLng,
              };
            })
          ).then((res) => {
            console.log(res);
            setPass(res);

            setShowMap(true);
          });

          // Do something with the user object
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

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
      // console.log(response.data);
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
      localStorage.setItem("requestId", response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const getGeo = async () => {
    setDirectionsResponse(localStorage.getItem("res"));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
      });
    }
  };

  useEffect(() => {
    getGeo();
    driverLocation();
    // console.log(pass);

    const interval = setInterval(() => {
      setCount(count + 1);
    }, 5000);

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
      originRef.current.value === ""
        ? origin == null
          ? null
          : origin
        : originRef.current.value;

    if (destinationRef.current.value === "" || start == null) {
      return;
    } else {
      // console.log(origin);
      // console.log(destinationRef.current.value);
      // console.log(originRef.current.value);

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: start,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      localStorage.setItem("res", results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      const x = JSON.stringify(start);
      await createRequest(x, destinationRef.current.value);
    }
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
        rides.length ? (
          <RideRequests
            rideRequests={rides}
            directions={setDirectionsResponse}
            userType={usertype}
          ></RideRequests>
        ) : (
          <div className="user-box">
            <div>
              <Autocomplete>
                <input
                  className="request-input"
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                />
              </Autocomplete>
            </div>
            <div>
              <Autocomplete>
                <input
                  className="request-input"
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

            <div>
              {distance && (
                <p>
                  Distance: {distance} Duration: {duration}
                </p>
              )}
            </div>
          </div>
        )
      ) : (
        <>
          {rides.length > 0 && (
            <RideRequests
              rideRequests={rides}
              directions={setDirectionsResponse}
              userType={usertype}
            ></RideRequests>
          )}
        </>
      )}
      {showMap && (
        <div className="map-container">
          <GoogleMap
            center={count === 0 ? center : null}
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
            {pass?.map((element) => {
              return (
                <Marker position={element.origin} label={"hello"}></Marker>
              );
            })}
            {markers && markers}
            {passengers &&
              passengers.map((passenger) => {
                return passenger;
              })}
            {origin && <Marker position={origin} label={"me"}></Marker>}

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}

export default Map;
