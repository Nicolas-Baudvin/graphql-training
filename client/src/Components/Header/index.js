import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default ({ dispatch, state }) => {
    const handleClickLogOut = (e) => {
        localStorage.clear();
        dispatch({ action: "CONNECTED", payload: '' })
    };
    return (
        <div>
            {
                state.userData && <>
                    <Button color="vk" icon="logout" onClick={handleClickLogOut} />
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
        </div>
    )
};
