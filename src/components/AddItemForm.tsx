import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";

type AddItemFormPropsType = {
    addTask: (newTitle: string, todolistId: string) => void
    id: string
}


const AddItemForm: FC<AddItemFormPropsType> = ({addTask, id}) => {
    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)
    let addTaskTitle = () => {
        const trimmedTitle = taskTitle.trim()
        if(trimmedTitle) {
            addTask(trimmedTitle, id)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }
    let onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addTaskTitle()
        }
    }
    const errorMessage = error
        ? <div style={{color: 'red'}}> Title is required!!!</div>
        : <div style={{color: 'green'}}>Enter task title!!!</div>
    const errorClass = error ? s.error : ''
    return<div>

            <input
                value={taskTitle}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeTitle}
                className={errorClass}
            />
            {errorMessage}
            <button  onClick={addTaskTitle}>+</button>

    </div>
}

export default AddItemForm