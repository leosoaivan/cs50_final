import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
  Anchor,
  Button,
  Fieldset,
  TextField,
} from 'react95';

import { signInWithEmail, signInWithGoogle } from "../../util/firebaseAuth";

const Form = styled.form`
  fieldset {
    margin-bottom: 24px;
  }

  .button-row {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
  }

  button:nth-of-type(2) {
    margin-top: 12px;
  }
`;

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
    </Form>
  )
}

export default Login;
