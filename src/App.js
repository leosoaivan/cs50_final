import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./util/firebaseAuth";
import UserContext from './context/UserContext';
import Login from './components/authForms/Login'
import Register from './components/authForms/Register'
import Reset from './components/authForms/Reset'
import Dashboard from './components/pages/Dashboard'

function App() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user && history) {
      history.replace("/dashboard");
    }
  }, [user, history]);

  return (
    <div className="App">
      <Router>
        <Switch>
          { user ? (
            <UserContext.Provider value={user}>
              <Route exact path="/" component={Dashboard} />
            </UserContext.Provider>
          ) : (
            <React.Fragment>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset" component={Reset} />
            </React.Fragment>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
