import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
export type changeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    newTitle: string
}

export type changeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    newFilter: FilterValuesType
}


type ActionType = changeTodoListFilterAT | changeTodoListTitleAT | AddTodoListAT | RemoveTodoListAT


export const todoListsReducer = (
                todoLists: TodolistType[],
                action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter( tl => tl.id !== action.id )
        case "ADD-TODOLIST":
            const newTodoID: string = v1()
            const newTodoList: TodolistType = {id: newTodoID, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
                   // {...tasks, [newTodoID]: [] }
        case "CHANGE-TODOLIST-TITLE":
         return todoLists.map((tl) => tl.id === action.todolistId ? {...tl, title: action.newTitle }: tl)
        case "CHANGE-TODOLIST-FILTER":
          return todoLists.map((tl) => tl.id === action.todolistId ? {...tl, filter: action. newFilter}: tl)
        default:
            return todoLists
    }
}