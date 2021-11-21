import React from 'react';
import { useHistory } from "react-router";
import {
  WindowHeader,
  WindowContent,
} from 'react95';

import Root from '../Root';
import CustomToolbar from '../CustomToolbar';
import { auth } from "../../util/firebaseAuth";

function AuthenticatedApp({ children }) {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut()
      .then(() => history.replace("/"))
  }

  return (
    <Root>
      <WindowHeader className='window-header'>
        <span>magic8ball.exe</span>
      </WindowHeader>
      <CustomToolbar handleLogout={handleLogout} />
      <WindowContent>
        { children }
      </WindowContent>
    </Root>
  )
}

export default AuthenticatedApp;
