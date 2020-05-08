import React, { useReducer } from 'react';
import { Form, Input, Button, Grid, Header, Icon, Popup } from 'semantic-ui-react';

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
  userData: ''
}

const reducer = (action, state = initialState) => {
  switch (action.type)
  {
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
    if (!state.userData) dispatch({ type: "CONNECTED", payload: data.connectUser });
  }

  const handleSubmitForm = (e) => {
    console.log(state.username, state.password)
    e.preventDefault();
    connectUser({ variables: { username: state.username, password: state.password } })
    console.log(CONNECT_USER)
  }

  return (
    <Grid centered as="div">
      {
        state.userData && <div className="userData">
          <h2> Welcome {state.userData.username} </h2>
          <p>Your fistname is {state.userData.firstname} </p>
          <p>And your token is {state.userData.token} </p>
        </div>
      }
      {
        !state.userData && <Form onSubmit={handleSubmitForm} action="" loading={state.isLoading} widths="equal" className="form">
          <Header>Please Connect</Header>
          <Form.Field inline>
            <Input value={state.username} onChange={(e) => dispatch({ ...state, username: e.target.value })} type="text" placeholder="Username" />
            <Popup
              trigger={<Icon name="question circle" />}
              content="Please, be sure that you're username contains min 6 characters"
            />
          </Form.Field>
          <Form.Field inline>
            <Input value={state.password} onChange={(e) => dispatch({ ...state, password: e.target.value })} type="password" placeholder="Password" />
            <Popup
              trigger={<Icon name="question circle" />}
              content="Please, be sure that you're password contains min 6 characters"
            />
          </Form.Field>

          <Button type="submit" content="Send" primary />
        </Form>
      }
    </Grid>
  );
}

export default App;
