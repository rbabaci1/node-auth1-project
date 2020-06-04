import React, { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
};

export default function Form({ type, onSubmit }) {
  const [formInfo, setFormInfo] = useState(initialState);

  const handleChange = e => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-wrapper">
      <form
        onSubmit={e => {
          onSubmit(e, formInfo);
          setFormInfo(initialState);
        }}
      >
        <h2>{type}</h2>

        {type === "Signup" && (
          <div className="fullName">
            <input
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstName"
              required
            />

            <input
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
            />
          </div>
        )}

        <label htmlFor="username">Enter Username:</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          name="username"
          required
        />

        <label htmlFor="password">Enter Password:</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Password"
          name="password"
          required
        />

        <button>{type}</button>
      </form>
    </div>
  );
}
