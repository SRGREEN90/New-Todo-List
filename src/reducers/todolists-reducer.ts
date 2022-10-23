import {TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoList = {
    type: "ADD-TODOLIST"
    title: string
}


export const todoListsReducer = (
                todoLists: TodolistType[],
                action: RemoveTodoList | AddTodoList
                                ): TodolistType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter( tl => tl.id !== action.id )
        case "ADD-TODOLIST":
            const newTodoID: string = v1()
            const newTodoList: TodolistType = {id: newTodoID, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
                   // {...tasks, [newTodoID]: [] }
        default:
            return todoLists

    }
}