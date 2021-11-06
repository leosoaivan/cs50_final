import React from 'react';
import { Route } from "react-router-dom";
import Login from '../authForms/Login';
import Register from '../authForms/Register';
import Reset from '../authForms/Reset'

function UnauthenticatedApp() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset" component={Reset} />
    </React.Fragment>
  )
}

export default UnauthenticatedApp;
