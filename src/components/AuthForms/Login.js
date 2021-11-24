import React, { useState } from 'react';
import {
  Button,
  Fieldset,
  TextField,
} from 'react95';

import { signInWithEmail, signInWithGoogle } from "../../util/firebaseAuth";
import Form from '../../styles/Form'
import Anchor from '../Anchor';

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
    <Form onSubmit={handleOnSubmit}>
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
        <Anchor to="/reset">Forgot Password</Anchor>
        <div>
          Don't have an account?&nbsp;
          <Anchor to="/register">Register now</Anchor>
        </div>
      </div>
    </Form>
  )
}

export default Login;
