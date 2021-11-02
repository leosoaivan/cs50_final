import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../../util/firebaseAuth";

const initialFormState = {
  email: '',
}

function Reset() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPasswordResetEmail(formInputs.email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="reset__textBox"
        value={formInputs.email}
        onChange={handleInputChange}
        placeholder="E-mail Address"
      />
      <button
        className="reset__btn"
        type="submit"
      >
        Send password reset email
      </button>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </form>
  );
}
export default Reset;
