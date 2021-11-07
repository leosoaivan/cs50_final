import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Fieldset,
  TextField,
} from 'react95';

import {
  createUserWithEmail,
  signInWithGoogle,
} from "../../util/firebaseAuth";
import '../../styles/authforms.css';

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
    <form onSubmit={register}>
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
          <Link to="/">Login now</Link>
        </div>
      </div>
    </form>
  );
}
export default Register;
