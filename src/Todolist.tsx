import React, {ChangeEvent} from "react";
import {FilterValuesTupe} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesTupe
    removeTodolist: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void

}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(props.id,newTitle)
    }

    return (
        <div>
            <h3>  <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id,newValue, props.id);
                        }


                        return <li key={t.id} className={t.isDone ? 'is-done' : ""}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
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


