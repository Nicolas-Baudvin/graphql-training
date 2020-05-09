import React, { useReducer } from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components
import Signup from '../Signup';
import Tasks from '../Tasks';
import Login from '../Login';
import HeaderPage from '../Header';


// Styles
import 'semantic-ui-css/semantic.min.css'
import './App.scss'

const initialState = {
  isLoading: false,
  error: '',
  username: 'Falorun',
  password: '123456',
  userData: localStorage.getItem('udta') ? JSON.parse(localStorage.getItem('udta')) : '',
}

const reducer = (state = initialState, action) => {
  switch (action.type)
  {
    case "CHANGE_VIEW": {
      return {
        ...state,
        view: action.payload
      }
    }
    case "LOADING": {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case "ERROR": {
      return {
        ...state,
        error: action.payload
      }
    }
    case "USERNAME": {
      return {
        ...state,
        username: action.username
      }
    }
    case "PASSWORD": {
      return {
        ...state,
        password: action.password
      }
    }
    case "CONNECTED": {
      localStorage.setItem('udta', JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <Grid centered as="div">
        <HeaderPage state={state} dispatch={dispatch} />
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
              state.userData ? <Tasks /> : <Redirect to="/" from="/tasks" />
            }
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
