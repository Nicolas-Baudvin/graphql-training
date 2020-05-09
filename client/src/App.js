import React, { useReducer } from 'react';
import { Form, Input, Button, Grid, Header, Icon, Popup, GridColumn, Message } from 'semantic-ui-react';

// Components
import Signup from './Components/Signup';

// GraphQL
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Styles
import 'semantic-ui-css/semantic.min.css'
import './App.scss'

const CONNECT_USER = gql`
  query ($username: String!, $password: String!) {
    connectUser(username: $username, password: $password)
}`;

const initialState = {
  isLoading: false,
  error: '',
  username: 'Falorun',
  password: '123456',
  userData: localStorage.getItem('udta') ? JSON.parse(localStorage.getItem('udta')) : '',
  view: 'login'
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

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [connectUser, { loading, data }] = useLazyQuery(CONNECT_USER);

  if (loading && !state.isLoading) dispatch({ type: "LOADING", payload: true });

  if (data)
  {
    console.log(data)
    if (state.isLoading === true) dispatch({ type: "LOADING", payload: false });
    if (!state.userData && data.connectUser.username) dispatch({ type: "CONNECTED", payload: data.connectUser });
    if (data.connectUser.errors && !state.error) dispatch({ type: "ERROR", payload: data.connectUser.errors });
  }

  const handleSubmitForm = (e) => {
    console.log(state.username, state.password)
    e.preventDefault();
    connectUser({ variables: { username: state.username, password: state.password } })
    console.log(CONNECT_USER)
  }

  const handleClickLogOut = (e) => {
    localStorage.clear();
    dispatch({ action: "CONNECTED", payload: '' })
  };

  return (
    <Grid centered as="div">
      {
        !state.userData && <div className="view">
          <Button color="vk" icon="user" onClick={() => dispatch({ type: "CHANGE_VIEW", payload: "login"})} />
          <Button color="vk" icon="user plus" onClick={() => dispatch({ type: "CHANGE_VIEW", payload: "signup" })} />
        </div>
      }
      {
        state.userData &&
        <GridColumn className="userData">
          <h2> Welcome {state.userData.username} </h2>
          <p>Your fistname is {state.userData.firstname} </p>
          <p>And your token is {state.userData.token} </p>
          <Button color="vk" icon="logout" onClick={handleClickLogOut} />
        </GridColumn>
      }
      {
        !state.userData && state.view === "login" && <Form error onSubmit={handleSubmitForm} action="" loading={state.isLoading} widths="equal" className="form">
          <Header>Please Connect</Header>
          <Form.Field inline>
            <Input value={state.username} onChange={(e) => dispatch({type: "USERNAME", username: e.target.value })} type="text" placeholder="Username" />
            <Popup
              trigger={<Icon name="question circle" />}
              content="Please, be sure that you're username contains min 6 characters"
            />
          </Form.Field>
          <Form.Field inline>
            <Input value={state.password} onChange={(e) => dispatch({ type: "PASSWORD", password: e.target.value })} type="password" placeholder="Password" />
            <Popup
              trigger={<Icon name="question circle" />}
              content="Please, be sure that you're password contains min 6 characters"
            />
          </Form.Field>

          <Button type="submit" content="Send" primary />
          {
            state.error && <Message error header="There is a mistake" content={state.error} />
          }
        </Form>
      }
      {
        state.view === "signup" && <Signup />
      }
    </Grid>
  );
}

export default App;
