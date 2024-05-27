import React, { useState } from "react";
import Navbar from "../Navbar/Nav";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [option, setOption] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { accessToken, login, signup, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleOption = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOption(!option);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (option) {
      login(username, password);
    } else {
      signup(username, email, password);
    }
  };

  return (
    <>
      <Navbar />
      {accessToken === null ? (
        <div className="login-container">
          <h1>{option ? "Login" : "Register"}</h1>
          <form onSubmit={handleSubmit} method="POST">
            {!option && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{option ? "Login" : "Register"}</button>
          </form>
          <hr />
          <p>
            {option ? "Don't have an account?" : "Already have an account?"}
            <a href="/" onClick={handleToggleOption}>
              {option ? "Register" : "Login"}
            </a>
          </p>
        </div>
      ) : (
        <div className="logout-container">
          <h1>Are you sure you want to Logout{username}?</h1>
          <button onClick={handleLogout}>Yes</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default Login;
