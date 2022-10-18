import React, {ChangeEvent, FC} from 'react'
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from './AddItemForm';
import s from "./TodoList.module.css";
import EditableSpan from "../EditableSpan";


type TodolistPropsType = {
    todoId: string
    tasks: TaskType[]
    title: string
    changeFilter: (todolistId: string, newFilter: FilterValuesType)=> void
    removeTasks: (taskId: string, todolistId: string)=> void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodoLists: (todolistId: string) => void
    filter: string
    changeTaskTitle: (taskId: string, todolistId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

const Todolist: FC<TodolistPropsType> = ({
                                             tasks,
                                             title,
                                             changeFilter,
                                             removeTasks,
                                             todoId,
                                             addTask,
                                             changeTaskStatus,
                                             removeTodoLists,
                                             filter,
                                             changeTaskTitle,
                                             changeTodolistTitle
                                         } ) => {

    let addTaskTitle = (newTitle: string) => {
      addTask(newTitle, todoId)
    }
    const changeTodolistEditableTitle = (newTitle: string) => {
        changeTodolistTitle(todoId, newTitle)
    }
    let TasksForRender = tasks.map(task => {
        let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, todoId)
        }
        let removeTaskHandler = () => removeTasks(task.id, todoId)
        const getClasses = ( )=> task.isDone ? s.isDone : ''
        const changeTaskForRenderTitle = (newTitle: string) => {
            changeTaskTitle(task.id, todoId, newTitle)
        }

        return(
            <li key={task.id} className={getClasses()}>
                <input
                    type='checkbox'
                    checked={task.isDone}
                    onChange={onCheckedHandler}
                />
                {/*<span className={getClasses()}>{task.title}</span>*/}
                <EditableSpan someTitle={task.title} changeTitle={changeTaskForRenderTitle}/>
                <button onClick={removeTaskHandler}>X</button>
            </li>

        )

    })

    //=======================btnStyles=========================================
    let btnClass = (newFilter: FilterValuesType) => filter === newFilter ? s.active : ''
    const filterAll = () => changeFilter(todoId,'all')
    const filterCompleted = () => changeFilter(todoId,'completed')
    const filterActive = () => changeFilter(todoId,'active')
    const removeTodoListsHandler = ()=>removeTodoLists(todoId)


    return <div>
        <h3>
            <EditableSpan someTitle={title} changeTitle={changeTodolistEditableTitle}/>
            {/*{title}*/}
            <button onClick={removeTodoListsHandler}>x</button>
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