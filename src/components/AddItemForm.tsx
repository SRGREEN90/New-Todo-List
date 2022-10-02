import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}


const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)
    let addItemTitle = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            addItem(trimmedTitle)
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
            addItemTitle()
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
            <button  onClick={addItemTitle}>+</button>

    </div>
}

export default AddItemForm