import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {
  Anchor,
  Button,
  Fieldset,
  TextField,
} from 'react95';
import { signInWithEmail, signInWithGoogle } from "../../util/firebaseAuth";

const Form = styled.form`
  .password-fieldset {
    margin-top: 24px;
  }

  .button-row {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
  }

  button:nth-of-type(2) {
    margin-top: 12px;
  }

  .form-links {
    margin-top: 24px;
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
          Google
        </Button>
      </div>
      <div className="form-links">
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
