import React from 'react';
import styled from 'styled-components';
import { Route } from "react-router-dom";
import {
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';
import Login from '../authForms/Login';
import Register from '../authForms/Register';
import Reset from '../authForms/Reset'

const Root = styled.div`
  .window {
    display: block;
  }

  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

function UnauthenticatedApp() {
  return (
    <Root>
      <Window className="window">
        <WindowHeader className='window-header'>
          <span>magic8ball.exe</span>
        </WindowHeader>
        <WindowContent>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
        </WindowContent>
      </Window>
    </Root>
  )
}

export default UnauthenticatedApp;
