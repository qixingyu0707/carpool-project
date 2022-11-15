import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripService from "../services/trip.service";

const TripComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "driver") {
        TripService.get(_id)
          .then((data) => {
            setTripData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "passenger") {
        TripService.getEnrolledTrips(_id)
          .then((data) => {
            setTripData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You have to login first to see the trips</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Back to login page
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role == "driver" && (
        <div>
          <h1>Welcome to Driver page</h1>
          <h3>Trips that created by you</h3>
        </div>
      )}

      {currentUser && currentUser.user.role == "passenger" && (
        <div>
          <h1>Welcome to passenger page</h1>
          <h3>Trips that you enrolled in.</h3>
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
//student
//course
//instructor
export default TripComponent;
