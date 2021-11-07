import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Fieldset,
  TextField,
} from 'react95';

import { sendPasswordReset } from "../../util/firebaseAuth";
import Form from '../../styles/Form';

const initialFormState = {
  email: '',
}

function Reset() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);
  const history = useHistory();

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPasswordReset(formInputs.email)
      .then(() => history.replace('/'))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset label="Email">
        <TextField
          type="text"
          name="email"
          value={formInputs.email}
          onChange={handleInputChange}
        />
      </Fieldset>
      <div className="button-row">
        <Button
          type="submit"
        >
          Send password reset email
        </Button>
      </div>
      <div>
        Don't have an account?&nbsp;
        <Link to="/register">Register now</Link>
      </div>
    </Form>
  );
}
export default Reset;
