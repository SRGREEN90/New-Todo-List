import React, {ChangeEvent, FC, useState} from 'react'
import {FilterValuesType, TaskType} from "../App";
import s from "./TodoList.module.css";


type TodolistPropsType = {
    tasks: Array<TaskType>
    title: string
    taskFilter: (filterValue: FilterValuesType) => void
    removeTasks: (id: number)=> void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: number, isDone: boolean) => void
}

const Todolist: FC<TodolistPropsType> = ({
               tasks,
               title,
               taskFilter,
               removeTasks,
               addTask,
               changeTaskStatus
} ) => {
   let [taskTitle, setTaskTitle] = useState<string>('')

   let onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
       setTaskTitle(e.target.value)
   }
    let addTaskTitle = () => addTask(taskTitle)


    let TasksForRender = tasks.map(t => {
        let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked)
        }
        let removeTaskHandler = () => removeTasks(t.id)
        return(
            <li key={t.id}>
                <input
                    type='checkbox'
                    checked={t.isDone}
                    onChange={onCheckedHandler}
                />
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>

        )

    })

    return <div>
        <h3 style={{color: 'red'}}>{title}</h3>
        <div>
            <input onChange={onChangeTitle}/>
            <button onClick={addTaskTitle}>+</button>
        </div>
           <div>
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