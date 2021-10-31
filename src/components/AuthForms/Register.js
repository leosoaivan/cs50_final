import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

const initialFormState = {
  email: '',
  password: '',
  name: '',
}

function Register() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading, history]);

  const register = (event) => {
    event.preventDefault();
    const { name, email, password } = formInputs;
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  return (
    <form onSubmit={register}>
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={formInputs.name}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={formInputs.email}
          onChange={handleInputChange}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={formInputs.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button className="register__btn">
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </form>
  );
}
export default Register;
