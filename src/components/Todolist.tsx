import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react'
import {FilterValuesType, NewTaskStateType, TaskType} from "../App";
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
   let [taskTitle, setTaskTitle] = useState<string>('')
   let [error, setError] = useState<boolean>(false)

   let onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
       setTaskTitle(e.currentTarget.value)
   }
    let addTaskTitle = () => {
       const trimmedTitle = taskTitle.trim()
        if(trimmedTitle) {
            addTask(trimmedTitle, id)
        }

        setTaskTitle('')
    }
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
          if(e.key === "Enter"){
              addTaskTitle()
          }
    }
    let btnClass = (newFilter: FilterValuesType) => filter === newFilter ? s.active : ''

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

    return <div>
        <h3 style={{color: 'red'}}>
            {title}
        <button onClick={()=>removeTodoLists(id)}>x</button>
        </h3>
        <div>
            <input  value={taskTitle} onKeyPress={onKeyPressHandler} onChange={onChangeTitle}/>
            <button  onClick={addTaskTitle}>+</button>
        </div>
           <div>
               {TasksForRender}
           </div>
        <div>
            <button
               // className={filter === "all" ? s.active : ''}
                className={btnClass("all")}
                onClick={() => changeFilter(id,'all')}>All</button>
            <button
                //className={filter === "active" ? s.active : ''}
                className={btnClass("active")}
                onClick={() => changeFilter(id,'active')}>Active</button>
            <button
                   // className={filter === "completed" ? s.active : ''}
                    className={btnClass("completed")}
                onClick={() => changeFilter(id,'completed')}>Completed</button>
        </div>

        </div>
}
export default Todolist