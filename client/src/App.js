import React from "react";
import { Route, NavLink } from "react-router-dom";

import Form from "./components/Form";

function App() {
  const handleLogin = () => {};

  const handleSignup = (e, userInfo) => {
    e.preventDefault();
    console.log(userInfo);
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
        path="/login"
        render={() => <Form type="Login" onSubmit={handleLogin} />}
      />
      <Route
        path="/signup"
        render={() => <Form type="Signup" onSubmit={handleSignup} />}
      />
    </div>
  );
}

export default App;
