import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, userNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "registration success! You will be directed to the login page."
        );
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {
          //因为message预设的是empty所以会是false value
          //但是如果setMessage之后就会变成不是empty就会触发下面这个alert
        }
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="The minimum of password is 6 character."
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role:</label>
          <input
            onChange={handleRole}
            type="text"
            className="form-control"
            placeholder="Only one of the two options of passenger or driver can be filled in."
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
