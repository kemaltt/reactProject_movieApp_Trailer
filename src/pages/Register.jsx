import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase-config";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertClass, setAlertClass] = useState("alert alert-success d-none");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let displayName = firstName + " " + lastName;
    try {
      let user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user);
      await updateProfile(auth.currentUser, { displayName: displayName });
      // console.log(auth.currentUser);
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <React.Fragment>
      <div className="register">
        <div className="form-image">
          <img
            src={"https://picsum.photos/800/800"}
            className="img-fluid"
            alt="photo"
          />
        </div>
        <div className="register-form">
          <div className={alertClass} role="alert">
            You have registered successfully!!!
          </div>
          <h1 className="form-title display-3">Register</h1>
          <form
            className=" ml-3"
            onSubmit={(e) => handleSubmit(e)}
            id="register"
          >
            <div className="register-info mb-3">
              <label htmlFor="first-name" className="form-label display-4">
                First Name
              </label>
              <input
                type="text"
                className="form-control "
                id="first-name"
                placeholder="Enter your first name..."
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last-name" className="form-label display-4">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Enter your last name..."
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label display-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label display-4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Register"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
