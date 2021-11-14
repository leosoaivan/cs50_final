import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router";
import {
  Window,
  WindowHeader,
  WindowContent,
} from 'react95';

import CustomToolbar from '../CustomToolbar';
import { auth } from "../../util/firebaseAuth";

const Root = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  #toolbar button:nth-of-type(1) {
    margin-right: 8px;
  }
`

function AuthenticatedApp({ children }) {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut()
      .then(() => history.replace("/"))
  }

  return (
    <Root>
      <Window style={{ width: '33%', minWidth: '356px' }}>
        <WindowHeader className='window-header'>
          <span>magic8ball.exe</span>
        </WindowHeader>
        <CustomToolbar handleLogout={handleLogout} />
        <WindowContent>
          { children }
        </WindowContent>
      </Window>
    </Root>
  )
}

export default AuthenticatedApp;
