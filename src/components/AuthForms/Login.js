import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from "../../util/firebaseAuth";

const initialFormState = {
  email: '',
  password: '',
}

function Login() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    signInWithEmail(formInputs.email, formInputs.password)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label for="email">Email:</label>
      <input
        type="text"
        name="email"
        value={formInputs.email}
        onChange={handleInputChange}
      />
      <label for="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formInputs.password}
        onChange={handleInputChange}
      />
      <button
        type="submit"
      >
        Login
      </button>
      <button
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </form>
  )
}

export default Login;
