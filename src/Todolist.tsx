import React, {useState} from "react";
import {FilterValuesTupe} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (id: string)=>void
    changeFilter: (value: FilterValuesTupe)=>void
    addTask: (title: string) => void

}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState ('');


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ (e)=>{ setNewTaskTitle(e.currentTarget.value) } }
                       onKeyPress={ (e) => {
                           if (e.charCode === 13){
                               props.addTask( newTaskTitle); setNewTaskTitle("");
                           }
                       } }
                />
                <button onClick={ ()=>{
                    props.addTask( newTaskTitle); setNewTaskTitle("");
                } }>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick =  { ()=>{props.removeTask(t.id)} }>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={ (e)=>{props.changeFilter("all")} }>ALL</button>
                <button onClick={ (e)=>{props.changeFilter("active")} }>Active</button>
                <button onClick={ (e)=>{props.changeFilter("completed")} }>Completed</button>
            </div>
        </div>
    )
}