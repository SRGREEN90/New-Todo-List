import {v1} from "uuid";
import {TodolistType} from "../App";
import {todoListsReducer} from "./todolists-reducer";

test('correct todoList should be removed', () => {
    //1.Тестовые данные:
    let todoList1 = v1()
    let todoList2 = v1()
    const startState: TodolistType[] = [
        {id: todoList1, title: 'What to learn?', filter: 'all'},
        {id: todoList2, title: 'What to buy?', filter: 'all'}
    ]
    //2. Вызов тестируемой функции:
   const endState = todoListsReducer(startState, {type: "REMOVE-TODOLIST", id: todoList2})

    //3. Сверка результата с ожиданием:
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoList1)
})

test('correct todoList should be added', () => {
    let todoList1: string = v1()
    let todoList2: string = v1()
    let newTodoListTitle: string = "Hello, it's a new Title!!!"

    const startState: TodolistType[] = [
        {id: todoList1, title: 'What to learn?', filter: 'all'},
        {id: todoList2, title: 'What to buy?', filter: 'all'}
    ]
    //2. Вызов тестируемой функции:
    const endState = todoListsReducer(startState, {type: "ADD-TODOLIST", title: newTodoListTitle})

    //3. Сверка результата с ожиданием:
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})