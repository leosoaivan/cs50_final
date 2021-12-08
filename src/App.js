import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyles from './styles/globalStyles';
import original from "react95/dist/themes/original";
import { BrowserRouter as Router, Route, Switch, Redirect,  useHistory } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./util/firebaseAuth";
import UserContext from './context/UserContext';
import UnauthenticatedApp from './components/pages/UnauthenticatedApp';
import Login from './components/authForms/Login';
import Reset from './components/authForms/Reset';
import Register from './components/authForms/Register';
import Dashboard from './components/pages/Dashboard';
import Forum from './components/pages/Forum';
import Settings from './components/pages/Settings';
import AuthenticatedApp from './components/pages/AuthenticatedApp';
import media from './styles/media';

const AppRoot = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;

  ${media.small`
    align-items: center;
    flex-direction: column;
  `}
`

function App() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user && history) {
      history.replace("/dashboard");
    }
  }, [user, history]);

  return (
    <AppRoot>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Router>
          <Switch>
            { user ? (
              <UserContext.Provider value={user}>
                <AuthenticatedApp>
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/forum" component={Forum} />
                    <Route exact path="/settings" component={Settings} />
                    <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                  </Switch>
                </AuthenticatedApp>
              </UserContext.Provider>
            ) : (
              <UnauthenticatedApp>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/reset" component={Reset} />
                </Switch>
              </UnauthenticatedApp>
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    </AppRoot>
  );
}

export default App;
