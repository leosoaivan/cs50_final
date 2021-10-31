import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/authForms/Login'
import Register from './components/authForms/Register'
import Reset from './components/authForms/Reset'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
