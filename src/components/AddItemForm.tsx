import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";

type AddItemFormPropsType = {
   addItem: (newTitle: string) => void
}


const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)
    let addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    let onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem()
        }
    }
    const errorMessage = error
        ? <div style={{color: 'red'}}> Title is required!!!</div>
        : <div style={{color: 'green'}}>Enter item title!!!</div>
    const errorClass = error ? s.error : ''
    return<div>

            <input
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeTitle}
                className={errorClass}
            />
            {errorMessage}
            <button  onClick={addItem}>+</button>

    </div>
}

export default AddItemForm