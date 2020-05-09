import React, { useState } from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';
import './style.scss';

export default () => {
    const initialState = {
        taskValue: '',
        tasks: [],
    };

    const [state, setstate] = useState(initialState);

    const handleClickButton = () => {

    };

    return (
        <Grid columns as="main">
            <Grid.Column>
                <h1>Your tasks</h1>
                <Input placeholder="Add a task" action={{ content: "Add", icon: "add", onClick: { handleClickButton } }} />
            </Grid.Column>
        </Grid>
    );
};
