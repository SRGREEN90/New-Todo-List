import React, { FC } from 'react'
import {FilterValuesType} from "./App";
import s from "./components/TodoList.module.css";
import {Button, ButtonGroup} from "@material-ui/core";

type ButtonsBlockPropsType = {
    changeFilter: (todolistId: string, newFilter: FilterValuesType)=> void
    todoId: string
    filter: FilterValuesType
}

const ButtonsBlock: FC<ButtonsBlockPropsType> = ({changeFilter, todoId, filter}) => {

    let btnClass = (newFilter: FilterValuesType) => filter === newFilter ? s.active : ''
    const filterAll = () => changeFilter(todoId,'all')
    const filterCompleted = () => changeFilter(todoId,'completed')
    const filterActive = () => changeFilter(todoId,'active')

    return<ButtonGroup variant="contained" size={'small'}>
            <Button
                color={filter === 'all' ? "secondary": 'primary'}


                className={btnClass("all")}
                onClick={filterAll}
            >All</Button>
            <Button
                color={filter === 'active' ? "secondary": 'primary'}
                className={btnClass("active")}
                onClick={filterActive}
            >Active</Button>
            <Button
                color={filter === 'completed' ? "secondary": 'primary'}
                className={btnClass("completed")}
                onClick={filterCompleted}
            >Completed</Button>
    </ButtonGroup>
}

export default ButtonsBlock












{/*<button*/}
{/*    className={btnClass("all")}*/}
{/*    onClick={filterAll}>All</button>*/}
{/*<button*/}
{/*    className={btnClass("active")}*/}
{/*    onClick={filterActive}>Active</button>*/}
{/*<button*/}
{/*    className={btnClass("completed")}*/}
{/*    onClick={filterCompleted}>Completed</button>*/}