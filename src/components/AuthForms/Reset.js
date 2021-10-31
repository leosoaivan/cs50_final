import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";

const initialFormState = {
  email: '',
}

function Reset() {
  const [ formInputs, setFormInputs ] = useState(initialFormState);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading, history]);

  function handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    setFormInputs({ ...formInputs, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPasswordResetEmail(formInputs.email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="reset__textBox"
        value={formInputs.email}
        onChange={handleInputChange}
        placeholder="E-mail Address"
      />
      <button
        className="reset__btn"
        type="submit"
      >
        Send password reset email
      </button>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </form>
  );
}
export default Reset;
