import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesTupe} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesTupe, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesTupe
    removeTodolist: (todoListId: string) => void

}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHangler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHangler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}> +</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}

                                   checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={onRemoveHandler}> x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}> ALL
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}> Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}> Completed
                </button>
            </div>
        </div>
    )
}