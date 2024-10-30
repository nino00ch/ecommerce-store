import React from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import loginImage from "../../components/Assets/imageLOGIN.jpg";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const SignUpPage = () => {
  const loading = true;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = useUserStore();

  const handleSubmit = (e) => {
    console.log("called here");
    e.preventDefault();
    signup(formData);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="Login-box">
      <div className="Wrapper">
        <div className="Login-image">
          <img className="logImg" src={loginImage} alt="" />
        </div>
        <div className="Login-text">
          <div className="form-box login">
            <form action="" onSubmit={handleSubmit}>
              <h1> Furniro</h1>
              <h4>Welcome to Furniro</h4>
              <div className="input-box">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="User name"
                />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  placeholder="confirm password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <FaLock className="icon" />
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />{" "}
                  <span>I agree to the terms & conditions</span>
                </label>
              </div>
              {/* <button type="submit">Login</button> */}
              <button class="btn">
                <span class="btn-text-one">Register</span>
                <span class="btn-text-two">Great!</span>
              </button>
              <div className="register-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={handleClick}>
                    Login{" "}
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

export default SignUpPage;
