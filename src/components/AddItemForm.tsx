import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";
import {LibraryAdd} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {TextField} from "@material-ui/core";

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

    return<div >
        <div className={s.add}>
            <TextField
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeTitle}
                variant={"outlined"}
                label={"Title"}
                size={"small"}
                error={error}
                helperText={error && "Title is required!"}
            />
            <LibraryAdd
                style={{ color: green[500] }}
                onClick={addItemTitle}>+
            </LibraryAdd>
        </div>
    </div>
}
export default AddItemForm












// const errorMessage = error
//     ? <div style={{color: 'red'}}> Title is required!!!</div>
//     : <div style={{color: 'green'}}>Enter item title!!!</div>
// const errorClass = error ? s.error : ''

{/*<input*/}
{/*    value={title}*/}
{/*    onKeyPress={onKeyPressHandler}*/}
{/*    onChange={onChangeTitle}*/}
{/*    className={errorClass}*/}
{/*/>*/}

{/*{errorMessage}*/}