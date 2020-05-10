import React, { useState, useEffect } from 'react';
import { Grid, Input, Container, Checkbox } from 'semantic-ui-react';
import cx from 'classnames';
import './style.scss';

// Mutation & Queries
import { ADD_TASK } from './Mutation';
import { GET_USER_TASKS } from './Queries';
import { useMutation, useLazyQuery } from 'react-apollo';

export default ({ userID }) => {
    const [addTask, { data }] = useMutation(ADD_TASK);
    const [myTasks, { data: tasksData }] = useLazyQuery(GET_USER_TASKS);
    const initialState = {
        taskValue: '',
        tasks: [],
    };
    const [state, setstate] = useState(initialState);

    if (data && !state.tasks.includes(data.taskCreateOne.record))
    {
        if (typeof data.taskCreateOne.record !== "undefined")
        {
            console.log(data.taskCreateOne);
            setstate({ ...state, tasks: [...state.tasks, data.taskCreateOne.record] });
        }
    }

    if (tasksData && !state.tasks.length)
    {
        console.log(tasksData)
        setstate({ ...state, tasks: tasksData.taskMany })
    }

    const handleClickButton = () => {
        addTask({ variables: { title: state.taskValue, isChecked: false, userID: userID } })
    };

    const handleClickOnTask = (id) => () => {
        const newTasks = state.tasks.map((task) => {
            if (task._id === id) return { ...task, isChecked: !task.isChecked }
            return task;
        });

        setstate({ ...state, tasks: newTasks });
    }

    const handleDrag = (e) => {
        console.log(e);
    };

    useEffect(() => {
        myTasks({ variables: { userID } });
    }, []);

    return (
        <Container textAlign="center" fluid className="main" as="main">
            <h1 className="main-title">Your tasks</h1>
            <Grid className="main-inputs">
                <Input
                    value={state.taskValue}
                    onChange={(e) => setstate({ ...state, taskValue: e.target.value })}
                    placeholder="Add a task"
                    action={
                        {
                            content: "Add",
                            icon: "add",
                            onClick: handleClickButton
                        }
                    }
                />
            </Grid>
            <div className="tasks">
                {
                    state.tasks.length > 0 && state.tasks.map((task) => (
                        <div
                            onDrag={handleDrag}
                            onDragEnter={() => console.log("Sur la tâche" + task._id)}
                            draggable="true"
                            key={task._id}
                            onClick={handleClickOnTask(task._id)}
                            className={cx("tasks-item", { checked: task.isChecked })}
                        >
                            <Checkbox
                                onClick={handleClickOnTask(task._id)}
                                checked={task.isChecked}
                            />

                            <p unselectable="true">{task.title}</p>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};
