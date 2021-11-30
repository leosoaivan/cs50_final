import React, { useState } from "react";
import {
  Button,
  Fieldset,
  TextField,
} from 'react95';

import {
  createUserWithEmail,
  signInWithGoogle,
} from "../../util/firebaseAuth";
import Form from '../../styles/Form';
import Anchor from '../Anchor';

const initialFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
}

function Register() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);

  const register = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formInputs;
    try {
      if (!name) {
        throw new Error("Please enter name");
      }
      if (password !== confirmPassword) {
        throw new Error ("Passwords do not match");
      }
      await createUserWithEmail(name, email, password);
    } catch (e) {
      alert(e)
    }
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
        <Fieldset label="Confirm password">
          <TextField
            type="password"
            name="confirmPassword"
            value={formInputs.confirmPassword}
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
          <Anchor to="/">Login now</Anchor>
        </div>
      </div>
    </Form>
  );
}
export default Register;
