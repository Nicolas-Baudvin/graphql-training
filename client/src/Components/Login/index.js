import React from 'react';
import { Button, Icon, Form, Header, Input, Popup, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const CONNECT_USER = gql`
  query ($username: String!, $password: String!) {
    connectUser(username: $username, password: $password)
}`;

export default ({ state, dispatch }) => {
    const [connectUser, { loading, data }] = useLazyQuery(CONNECT_USER);

    const handleSubmitForm = (e) => {
        console.log(state.username, state.password)
        e.preventDefault();
        connectUser({ variables: { username: state.username, password: state.password } })
        console.log(CONNECT_USER)
    }

    if (loading && !state.isLoading) dispatch({ type: "LOADING", payload: true });

    if (data)
    {
        console.log(data)
        if (state.isLoading === true) dispatch({ type: "LOADING", payload: false });
        if (!state.userData && data.connectUser.username) dispatch({ type: "CONNECTED", payload: data.connectUser });
        if (data.connectUser.errors && !state.error) dispatch({ type: "ERROR", payload: data.connectUser.errors });
    }

    return (
        <Form error onSubmit={handleSubmitForm} action="" loading={state.isLoading} widths="equal" className="form">
            <Header>Please Connect</Header>
            <Form.Field inline>
                <Input value={state.username} onChange={(e) => dispatch({ type: "USERNAME", username: e.target.value })} type="text" placeholder="Username" />
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
    )
};
