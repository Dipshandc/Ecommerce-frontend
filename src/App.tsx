import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Login} path="/login-register" />
    </Routes>
  );
};

export default App;
