import React, { useState } from "react";
import { Route, Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "./components/Form";
import Users from "./components/Users";
import ProtectedUsers from "./PrivateRoutes/ProtectedUsers";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = userInfo => {
    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          userInfo
        );

        setAuthenticated(true);
        history.push("/users");
      } catch (error) {
        setError("Can't Login, try again?");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignup = userInfo => {
    axios
      .post("http://localhost:5000/api/auth/register", userInfo)
      .then(r => history.push("/users"))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Welcome home</h1>

      <div className="nav-bar">
        <section className="left-arrow">
          <Link to="/">
            <span>⬅️</span>
          </Link>
        </section>

        <section className="login-signup">
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </section>
      </div>

      <Route
        exact
        path="/login"
        render={() => (
          <Form
            type="Login"
            isLoading={isLoading}
            error={error}
            onSubmit={handleLogin}
          />
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => <Form type="Signup" onSubmit={handleSignup} />}
      />

      <ProtectedUsers
        path="/users"
        authenticated={authenticated}
        component={Users}
      />
    </div>
  );
}

export default App;
