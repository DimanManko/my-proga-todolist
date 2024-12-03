import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesTupe} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesTupe) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void

}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHangler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }
    const onAllClickHandler = () =>  props.changeFilter("all")
    const onActiveClickHandler = () =>  props.changeFilter("active")
    const onCompletedClickHandler = () =>  props.changeFilter("completed")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHangler} />
                <button onClick= {addTask}>  +  </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {props.removeTask(t.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id}>
                            <input type="checkbox"
                                   onChange={ onChangeHandler }

                                   checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={onRemoveHandler}> x </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}> ALL </button>
                <button onClick={onActiveClickHandler}> Active </button>
                <button onClick={onCompletedClickHandler}> Completed </button>
            </div>
        </div>
    )
}