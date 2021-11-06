import React, { useEffect } from 'react';
import GlobalStyles from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import original from "react95/dist/themes/original";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./util/firebaseAuth";
import UserContext from './context/UserContext';
import UnauthenticatedApp from './components/pages/UnauthenticatedApp';
import Dashboard from './components/pages/Dashboard';

function App() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user && history) {
      history.replace("/dashboard");
    }
  }, [user, history]);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Router>
          <Switch>
            { user ? (
              <UserContext.Provider value={user}>
                <Route exact path="/" component={Dashboard} />
              </UserContext.Provider>
            ) : (
              <UnauthenticatedApp />
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
