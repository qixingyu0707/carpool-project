import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import TripService from "../services/trip.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "passenger") {
        TripService.getEnrolledTrips(_id)
          .then((data) => {
            console.log("P!!!");
            setTripData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  console.log(tripData);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>Login to get your profile</div>}
      {currentUser && (
        <div>
          <h2>Your profile</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name:{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Your user ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Your email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Role: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {currentUser && tripData && tripData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tripData.map((trip) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Title of Trip: {trip.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {trip.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    Number of Passengers: {trip.passengers.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>Price $: {trip.price}</p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    Driver: {trip.driver.username}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
