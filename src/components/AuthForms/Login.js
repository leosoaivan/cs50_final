import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Anchor,
  Button,
  Fieldset,
  TextField,
} from 'react95';

import { signInWithEmail, signInWithGoogle } from "../../util/firebaseAuth";
import '../../styles/authforms.css';

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
      <Fieldset label="Email">
        <TextField
          type="text"
          name="email"
          value={formInputs.email}
          onChange={handleInputChange}
        />
      </Fieldset>
      <Fieldset className="password-fieldset" label="Password">
        <TextField
          type="password"
          name="password"
          value={formInputs.password}
          onChange={handleInputChange}
        />
      </Fieldset>
      <div className="button-row">
        <Button
          type="submit"
        >
          Login
        </Button>
        <Button
          onClick={signInWithGoogle}
          type="button"
        >
          Login with Google
        </Button>
      </div>
      <div>
        <Anchor>
          <Link to="/reset">Forgot Password</Link>
        </Anchor>
        <div>
          Don't have an account?&nbsp;
          <Anchor>
            <Link to="/register">Register now</Link>
          </Anchor>
        </div>
      </div>
    </form>
  )
}

export default Login;
