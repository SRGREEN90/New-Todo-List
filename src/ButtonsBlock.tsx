import React, { FC } from 'react'
import {FilterValuesType} from "./App";
import s from "./components/TodoList.module.css";
import {Button} from "@material-ui/core";

type ButtonsBlockPropsType = {
    changeFilter: ( newFilter: FilterValuesType)=> void
    filter: FilterValuesType
}

const ButtonsBlock: FC<ButtonsBlockPropsType> = ({changeFilter, todoId, filter}) => {

    // let btnClass = (newFilter: FilterValuesType) => filter === newFilter ? s.active : ''
    const filterAll = () => changeFilter('all')
    const filterCompleted = () => changeFilter('completed')
    const filterActive = () => changeFilter('active')
    return<div>
        <div>
            <Button
                color="primary"
                variant="contained"
                size={'small'}
                // className={btnClass("all")}
                onClick={filterAll}
            >All</Button>
            <Button
                color="secondary"
                variant="contained"
                size={'small'}
                // className={btnClass("active")}
                onClick={filterActive}
            >Active</Button>
            <Button
                color="default"
                variant="contained"
                size={'small'}
                // className={btnClass("completed")}
                onClick={filterCompleted}
            >Completed</Button>

            {/*<button*/}
            {/*    className={btnClass("all")}*/}
            {/*    onClick={filterAll}>All</button>*/}
            {/*<button*/}
            {/*    className={btnClass("active")}*/}
            {/*    onClick={filterActive}>Active</button>*/}
            {/*<button*/}
            {/*    className={btnClass("completed")}*/}
            {/*    onClick={filterCompleted}>Completed</button>*/}
        </div>
    </div>
}

export default ButtonsBlock