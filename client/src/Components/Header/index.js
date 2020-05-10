import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

export default ({ dispatch, state }) => {
    const history = useHistory();
    const handleClickLogOut = (e) => {
        localStorage.clear();
        dispatch({ action: "CONNECTED", payload: '' });
        history.push('/')
    };
    return (
        <header className="header">
            {
                state.userData && <>
                    <Button color="vk" icon="log out" onClick={handleClickLogOut} />
                    <Link to="/tasks" >
                        <Button icon="tasks" color="violet" />
                    </Link>
                </>
            }
            {
                !state.userData && <>
                    <Link to="/login">
                        <Button color="vk" icon="user" />
                    </Link>
                    <Link to="/signup">
                        <Button color="vk" icon="user plus" />
                    </Link>
                </>
            }
        </header>
    )
};
