import React, {FC} from 'react'
import {TaskType} from "../App";
import s from "./TodoList.module.css";


type TodolistPropsType = {
    tasks: Array<TaskType>
    title: string
}

const Todolist: FC<TodolistPropsType> = ({tasks, title} ) => {

    let TasksForRender = tasks.map(t => {
        return(
            <li key={t.id}>
                <input type='checkbox' checked={t.isDone}></input>
                <span>{t.title}</span>
                <button>X</button>
            </li>

        )

    })


    return <div >
        <h3 style={{color: 'blue'}}>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
           <div >
               {TasksForRender}
           </div>
        <div>
            <button >All</button>
            <button >Active</button>
            <button >Completed</button>
        </div>

        </div>
}
export default Todolist