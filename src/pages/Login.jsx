import { useState, useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginError } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="form-image">
          <img
            src={"https://picsum.photos/800/800"}
            className="img-fluid "
            alt="photo"
          />
        </div>
        <div className="login-form ">
          <div
            className={loginError ? "alert alert-danger" : "alert alert d-none"}
            role="alert"
          >
            Please check your credentials!!!
          </div>
          <h1 className="form-title display-3">Login</h1>
          <form className="ml-2" id="login" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label for="email" className="form-label display-4">
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
              <label for="password" className="form-label display-4">
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
              value="Login"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
