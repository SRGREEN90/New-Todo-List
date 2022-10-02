import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react'
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from './AddItemForm';
import s from "./TodoList.module.css";


type TodolistPropsType = {
    id: string
    tasks: TaskType[]
    title: string
    changeFilter: (todolistId: string, newFilter: FilterValuesType)=> void
    removeTasks: (taskId: string, todolistId: string)=> void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodoLists: (todolistId: string) => void
    filter: FilterValuesType
}

const Todolist: FC<TodolistPropsType> = ({
               tasks,
               title,
               changeFilter,
               removeTasks,
               id,
               addTask,
               changeTaskStatus,
               removeTodoLists,
               filter,
} ) => {


    let addTaskTitle = (newTitle: string) => {
        addTask(newTitle, id)
    }

    let TasksForRender = tasks.map(task => {
        let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, id)
        }
        let removeTaskHandler = () => removeTasks(task.id, id)
        const getClasses = ( )=> task.isDone ? s.isDone : ''

        return(
            <li key={task.id} >
                <input
                    type='checkbox'
                    checked={task.isDone}
                    onChange={onCheckedHandler}
                />
                <span className={getClasses()}>{task.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>

        )

    })
    //=======================btnStyles=========================================
    let btnClass = (newFilter: FilterValuesType) => filter === newFilter ? s.active : ''
    const filterAll = () => changeFilter(id,'all')
    const filterCompleted = () => changeFilter(id,'completed')
    const filterActive = () => changeFilter(id,'active')

    return <div>
        <h3>
            {title}
        <button onClick={()=>removeTodoLists(id)}>x</button>
        </h3>
        <div>
            <AddItemForm addItem={addTaskTitle}/>
        </div>
           <div>
               {TasksForRender}
           </div>
        <div>
            <button
                className={btnClass("all")}
                onClick={filterAll}>All</button>
            <button
                className={btnClass("active")}
                onClick={filterActive}>Active</button>
            <button
                    className={btnClass("completed")}
                onClick={filterCompleted}>Completed</button>
        </div>

        </div>
}
export default Todolist