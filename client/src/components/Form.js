import React from "react";

export default function Form() {
  return (
    <div className="form-wrapper">
      <form>
        <input type="text" placeholder="Username" required />
        <input type="text" placeholder="Password" required />
      </form>
    </div>
  );
}
