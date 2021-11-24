import React from 'react';
import {
  WindowContent,
  WindowHeader,
} from 'react95';

import Root from '../Root';

function UnauthenticatedApp({ children }) {
  return (
    <Root>
      <WindowHeader className='window-header'>
        <span>magic8ball.exe</span>
      </WindowHeader>
      <WindowContent>
        {children}
      </WindowContent>
    </Root>
  )
}

export default UnauthenticatedApp;
