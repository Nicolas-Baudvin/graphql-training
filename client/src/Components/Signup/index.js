import React, { useState } from 'react';
import { Form, Header, Input, Button, Message } from 'semantic-ui-react';

// GraphQL
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SUBSCRIBE = gql`
    mutation ($username: String!, $password: String!, $firstname: String!) {
      userCreateOne(record: {
        username: $username,
        firstname: $firstname,
        password: $password
      }) {
        record {
          username,
          password,
          firstname,
          _id
        }
      }
    }
`;


export default () => {
    const [subscribe, { data, loading, error }] = useMutation(SUBSCRIBE);
    const initialState = {
        isLoading: false,
        username: '',
        firstname: '',
        password: '',
        error: ''
    };
    const [state, setstate] = useState(initialState);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        subscribe({ variables: { username: state.username, password: state.password, firstname: state.firstname } });
    };

    if (loading && !state.isLoading) setstate({ ...state, isLoading: true });
    if (data && !state.subscribeData) {
        console.log(data)
        setstate({ ...state, subscribeData: data.userCreateOne, isLoading: false });
    }
        if (error && !state.error)
    {
        console.log(error);
        setstate({ ...state, error });
    }

    return (

        <Form onSubmit={handleSubmitForm} loading={state.isLoading}>
            <Header>Subscribe</Header>
            <Form.Field>
                <Input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setstate({ ...state, username: e.target.value })}
                    value={state.username}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type="text"
                    placeholder="Firstname"
                    onChange={(e) => setstate({ ...state, firstname: e.target.value })}
                    value={state.firstname}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setstate({ ...state, password: e.target.value })}
                    value={state.password}
                />
            </Form.Field>

            <Button type="submit" content="Subscribe" primary />

            {
                state.error && <Message error content={state.error} header="Oups, There is a mistake" />
            }
        </Form>
    )

}