import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Nav";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [option, setOption] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const handleToggleOption = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOption(!option);
  };
  const handleLogout = () => {
    localStorage.clear();
    setAuthToken(null);
    console.log(authToken);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (option) {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          username,
          password,
        });
        const token = response.data.access;
        setAuthToken(token);
        localStorage.setItem("token", token);
        console.log(authToken);

        navigate("/");
      } else {
        const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          setOption(!option);
        }
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      {authToken === null ? (
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
        <div>
          <h1>Are you sure you want to Logout?</h1>
          <button onClick={handleLogout}>Yes</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default Login;
