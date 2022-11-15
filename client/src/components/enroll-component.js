import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripService from "../services/trip.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    TripService.getTripByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    TripService.enroll(e.target.id)
      .then(() => {
        window.alert("Trip enroll is successful. Redirected to the trip page.");
        navigate("/trip");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for trips.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "driver" && (
        <div>
          <h1>Only passengers can enroll in trips.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "passenger" && (
        <div>
          <p>Ex: 09.12 SwartzBay to Uvic</p>
          <p>Upper or lower case matter</p>
          <div className="search input-group mb-3">
            <input
              placeholder=" Please set your search title in format: DD.MM Departure to
            Destination"
              onChange={handleChangeInput}
              type="text"
              className="form-control"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>We get data from API: </p>
          {searchResult.map((trip) => (
            <div key={trip._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Title of Trip:{trip.title}</h5>
                <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                  {trip.description}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  Number of Passengers: {trip.passengers.length}
                </p>
                <p style={{ margin: "0.5rem 0rem" }}>Price $:{trip.price}</p>
                <p style={{ margin: "0.5rem 0rem" }}>
                  Driver: {trip.driver.username}
                </p>
                <p>You can contact driver to get the details of the trip</p>
                <a
                  href="#"
                  onClick={handleEnroll}
                  className="card-text btn btn-primary"
                  id={trip._id}
                >
                  Enroll Trip
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
