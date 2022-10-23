import {TodolistType} from "../App";

type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    id: string
}


export const todoListsReducer = (
                todoLists: TodolistType[],
                action: RemoveTodoList
                                ): TodolistType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter( tl => tl.id !== action.id )
        default:
            return todoLists
    }


}