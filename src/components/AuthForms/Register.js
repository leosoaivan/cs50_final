import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
  Anchor,
  Button,
  Fieldset,
  TextField,
} from 'react95';

import {
  createUserWithEmail,
  signInWithGoogle,
} from "../../util/firebaseAuth";

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
`

const initialFormState = {
  email: '',
  password: '',
  name: '',
}

function Register() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);

  const register = async (event) => {
    event.preventDefault();
    const { name, email, password } = formInputs;
    if (!name) alert("Please enter name");
    await createUserWithEmail(name, email, password);
  };

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  return (
    <Form onSubmit={register}>
      <div className="register__container">
        <Fieldset label="Name">
          <TextField
            type="text"
            name="name"
            value={formInputs.name}
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset label="Email">
          <TextField
            type="text"
            name="email"
            value={formInputs.email}
            onChange={handleInputChange}
          />
        </Fieldset>
        <Fieldset label="Password">
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
            Register
          </Button>
          <Button
            onClick={signInWithGoogle}
          >
            Register with Google
          </Button>
        </div>
        <div>
          Already have an account?&nbsp;
          <Anchor>
            <Link to="/">
              Login now.
            </Link>
          </Anchor>
        </div>
      </div>
    </Form>
  );
}
export default Register;
