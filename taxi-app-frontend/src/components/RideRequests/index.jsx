import React, { useState } from "react";
import "./index.css"; // Import the CSS file for styling
import axios from "axios";

const RideRequests = ({ rideRequests, directions, userType }) => {
  const [requests, setRequests] = useState(rideRequests);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwt");

  const cancelRequest = async (requestId) => {
    setLoading(true);
    try {
      await cancel(requestId);
      const updatedRequests = requests.filter(
        (request) => request.id !== requestId
      );
      directions(null);
      setRequests(updatedRequests);
      console.log(`Request with ID ${requestId} cancelled successfully.`);
    } catch (error) {
      console.error(`Failed to cancel request with ID ${requestId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-requests/update-with-driver",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // const acceptedRequest = requests.filter((request) => request.id === requestId);
      // setRequests(acceptedRequest);
      console.log(`Request with ID ${id} accepted successfully.`);
    } catch (error) {
      console.error(`Failed to accept request with ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-requests/cancel",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize the formatting using toLocaleString options
  };

  return (
    <div className="ride-requests-container">
      {requests?.map((request) => (
        <div className="ride-request" key={request.id}>
          <table>
            <tbody>
              <tr>
                <td className="attribute">Origin:</td>
                <td>{request.origin}</td>
              </tr>
              <tr>
                <td className="attribute">Destination:</td>
                <td>{request.destination}</td>
              </tr>
              <tr>
                <td className="attribute">Updated At:</td>
                <td>{formatDate(request.updated_at)}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  {userType === 3 && request.status == 1 && (
                    <button
                      className="accept-button"
                      onClick={() => acceptRequest(request.id)}
                      disabled={loading}
                    >
                      {loading ? "Accepting..." : "Accept Ride"}
                    </button>
                  )}
                  <button
                    className="cancel-button"
                    onClick={() => cancelRequest(request.id)}
                    disabled={loading}
                  >
                    {loading ? "Cancelling..." : "Cancel Ride"}
                  </button>
                  {loading && <div className="loading"></div>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RideRequests;
