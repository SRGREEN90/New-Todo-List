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
    filter: string
    removeTodoLists: (todolistId: string) => void
}

const Todolist: FC<TodolistPropsType> = ({
               tasks,
               title,
               changeFilter,
               removeTasks,
               id,
               addTask,
               changeTaskStatus,
               removeTodoLists
} ) => {
   let [taskTitle, setTaskTitle] = useState<string>('')

   let onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
       setTaskTitle(e.currentTarget.value)
   }
    let addTaskTitle = () => {
        addTask(taskTitle, id)
        setTaskTitle('')
    }
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
          if(e.key === "Enter"){
              addTaskTitle()
          }
    }

    let TasksForRender = tasks.map(t => {
        let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, id)
        }
        let removeTaskHandler = () => removeTasks(t.id, id)
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
            <button onClick={() => changeFilter(id,'all')}>All</button>
            <button onClick={() => changeFilter(id,'active')}>Active</button>
            <button onClick={() => changeFilter(id,'completed')}>Completed</button>
        </div>

        </div>
}
export default Todolist