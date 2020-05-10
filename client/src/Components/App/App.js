import React, { useReducer } from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components
import Signup from '../Signup';
import Tasks from '../Tasks';
import Login from '../Login';
import HeaderPage from '../Header';

import { reducer, initialState } from './reducer';

// Styles
import 'semantic-ui-css/semantic.min.css'
import './App.scss'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <HeaderPage state={state} dispatch={dispatch} />
      <Grid centered as="div">
        <Switch>
          <Route exact path="/login">
            {
              !state.userData ? <Login state={state} dispatch={dispatch} /> : <Redirect to="/tasks" from="login" />
            }
          </Route>
          <Route exact path="/signup">
            {
              !state.userData ? <Signup /> : <Redirect to="/tasks" from="signup" />
            }
          </Route>
          <Route exact path="/tasks">
            {
              state.userData ? <Tasks userID={state.userData.userID} /> : <Redirect to="/" from="/tasks" />
            }
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
