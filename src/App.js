import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import original from "react95/dist/themes/original";
import { BrowserRouter as Router, Route, Switch, Redirect,  useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./util/firebaseAuth";
import UserContext from './context/UserContext';
import UnauthenticatedApp from './components/pages/UnauthenticatedApp';
import Dashboard from './components/pages/Dashboard';
import Forum from './components/pages/Forum';
import AuthenticatedApp from './components/pages/AuthenticatedApp';

const AppRoot = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
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
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/forum" component={Forum} />
                  <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                </AuthenticatedApp>
              </UserContext.Provider>
            ) : (
              <UnauthenticatedApp />
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    </AppRoot>
  );
}

export default App;
