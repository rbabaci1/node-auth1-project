import React, { useState } from "react";
import { Route, NavLink, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "./components/Form";
import Users from "./components/Users";
import ProtectedUsers from "./PrivateRoutes/ProtectedUsers";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const history = useHistory();

  const handleLogin = userInfo => {
    axios
      .post("http://localhost:5000/api/auth/login", userInfo)
      .then(res => {
        if (res.status === 200) {
          setAuthenticated(true);
          history.push("/users");
        }
      })
      .catch(err => {
        console.error(err);
      });
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

      <div className="links">
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>

      <Route
        exact
        path="/login"
        render={() => <Form type="Login" onSubmit={handleLogin} />}
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
