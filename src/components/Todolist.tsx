import React, {FC} from 'react'
import {FilterValuesType, TaskType} from "../App";
import s from "./TodoList.module.css";


type TodolistPropsType = {
    tasks: Array<TaskType>
    title: string
    taskFilter: (filterValue: FilterValuesType) => void
    removeTasks: (id: number)=> void
}

const Todolist: FC<TodolistPropsType> = ({
                                             tasks,
                                             title,
                                             taskFilter,
                                             removeTasks
} ) => {

    let TasksForRender = tasks.map(t => {
        return(
            <li key={t.id}>
                <input type='checkbox' checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTasks(t.id)}>X</button>
            </li>

        )

    })


    return <div >
        <h3 style={{color: 'red'}}>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
           <div >
               {TasksForRender}
           </div>
        <div>
            <button onClick={() => taskFilter('all')}>All</button>
            <button onClick={() => taskFilter('active')}>Active</button>
            <button onClick={() => taskFilter('completed')}>Completed</button>
        </div>

        </div>
}
export default Todolist