import React from "react";
import "./LoginPage.css";
import { FaUser, FaLock } from "react-icons/fa";
import loginImage from "../../components/Assets/imageLOGIN.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loading = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signUp");
  };
  return (
    <div className="Login-box">
      <div className="Wrapper">
        <div className="Login-image">
          <img className="logImg" src={loginImage} alt="" />
        </div>
        <div className="Login-text">
          <div className="form-box login">
            <form action="">
              <h1> Furniro</h1>
              <h4>Welcome back to Furniro</h4>
              <div className="input-box">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <FaLock className="icon" />
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#">Forgot Password</a>
              </div>
              {/* <button type="submit">Login</button> */}
              <button class="btn">
                <span class="btn-text-one">Login</span>
                <span class="btn-text-two">Great!</span>
              </button>
              <div className="register-link">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={handleClick}>
                    Register{" "}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
