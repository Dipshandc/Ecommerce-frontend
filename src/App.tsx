import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import ActivationPage from "./Components/ActivationPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route Component={Home} path="/" />
      <Route Component={Login} path="/login-register" />
      <Route Component={Cart} path="/cart" />
      <Route Component={Profile} path="/profile" />
      <Route
        path="/auth/users/activation/:uid/:token"
        Component={ActivationPage}
      />
    </Routes>
  );
};

export default App;
