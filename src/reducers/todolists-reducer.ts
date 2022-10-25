import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoList = {
    type: "ADD-TODOLIST"
    title: string
}
type changeTodoListTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    newTitle: string
}

type changeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    newFilter: FilterValuesType
}


type ActionType = changeTodoListFilter | changeTodoListTitle | AddTodoList | RemoveTodoList


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