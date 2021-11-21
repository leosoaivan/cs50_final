import React from 'react';
import { Route } from "react-router-dom";
import {
  WindowContent,
  WindowHeader,
} from 'react95';

import Root from '../Root';
import Login from '../authForms/Login';
import Register from '../authForms/Register';
import Reset from '../authForms/Reset';

function UnauthenticatedApp() {
  return (
    <Root>
      <WindowHeader className='window-header'>
        <span>magic8ball.exe</span>
      </WindowHeader>
      <WindowContent>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset" component={Reset} />
      </WindowContent>
    </Root>
  )
}

export default UnauthenticatedApp;
