import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";
import {LibraryAdd} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}


const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)
    let addItemTitle = () => {
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
            addItemTitle()
        }
    }
    const errorMessage = error
        ? <div style={{color: 'red'}}> Title is required!!!</div>
        : <div style={{color: 'green'}}>Enter item title!!!</div>
    const errorClass = error ? s.error : ''
    return<div >
        <div className={s.add}>
            <input
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeTitle}
                className={errorClass}
            />
            <LibraryAdd style={{ color: green[500] }}  onClick={addItemTitle}>+</LibraryAdd>
        </div>

            {errorMessage}


    </div>
}

export default AddItemForm