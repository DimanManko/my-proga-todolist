import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesTupe = "all" | "completed" | "active";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesTupe
}


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesTupe, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList){
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }

    let [todoLists, setTodoLists]= useState<Array<TodoListType>> ([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"},
    ])

    return (
        <div className="App">
            {
                todoLists.map((tl) => {

                    let tasksForTodolist = tasks
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
