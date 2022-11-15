import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripService from "../services/trip.service";

const PostTripComponent = ({ currentUser, setCurrentUser }) => {
  // let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postTrip = () => {
    TripService.post(title, description, price)
      .then(() => {
        window.alert("New trip has been created");
        navigate("/trip");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
    //student
    //course
    //instructor
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You should login to post new trip</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "driver" && (
        <div>
          <p>Only driver can post new trip</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "driver" && (
        <div className="form-group">
          <label for="exampleforTitle">Trip title:</label>
          <p>Please set your title in format: DD.MM Departure to Destination</p>
          <p>Ex: 09.12 SwartzBay to Uvic</p>
          <br />
          <input
            placeholder="Please make sure your title format is correct."
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">Content:</label>
          <textarea
            placeholder="You can describe your trip details here, such as time or charge. Please leave your phone# or email address for contacting."
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <label for="exampleforPrice">Price:</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postTrip}>
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostTripComponent;
