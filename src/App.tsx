import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type NewTaskStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string
    title: string
    filter: string
}

function App() {
    let first: string = v1()
    let second: string = v1()
   const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: first, title: 'What to learn?', filter: 'all'},
        {id: second, title: 'What to buy?', filter: 'all'}
    ])
   const [tasks, setTasks] = useState<NewTaskStateType>({
       [first]: [
           {id: v1(), title: 'HTML', isDone: true},
           {id: v1(), title: 'CSS', isDone: false},
           {id: v1(), title: 'JS', isDone: false},
           {id: v1(), title: 'TypeScript', isDone: false},
           {id: v1(), title: 'React', isDone: true}
       ],
       [second]: [
           {id: v1(), title: 'Beer', isDone: true},
           {id: v1(), title: 'Milk', isDone: false},
           {id: v1(), title: 'Meat', isDone: false},
           {id: v1(), title: 'Fruits', isDone: false},
           {id: v1(), title: 'Bread', isDone: true}
       ],
   })
  const [filter, setFilter] = useState<FilterValuesType>('all')
    //===================TodolistFunctions=======================

    let removeTodoLists = (todolistId: string) => {
        setTodoLists(todoLists.filter( tl => tl.id !== todolistId ))
        delete tasks[todolistId]
    }
    let addTodoLists = (newTitle: string) => {
        const newTodoID = v1()
        setTodoLists([...todoLists, {id: newTodoID, title: newTitle, filter: 'all'}])
        setTasks({...tasks, [newTodoID]: [] })
    }
    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todolistId ? {...tl, title: newTitle }: tl))
    }
    //===================TaskFunctions=======================

    let changeFilter = (todolistId: string, newFilter: FilterValuesType) => {
        setTodoLists(todoLists.map((tl) => tl.id === todolistId ? {...tl, filter: newFilter }: tl))
    }
    let removeTasks = (taskId: string, todolistId: string) => {
      const copyState: NewTaskStateType = {...tasks} //делаем копию стейта
        copyState[todolistId] = tasks[todolistId].filter(t => t.id !== taskId) //мы вносим изменения в copyState
         setTasks(copyState)
    }
    let addTask = (newTitle: string, todolistId: string) => {
      let newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
      const copyState = {...tasks}
        copyState[todolistId] = [...tasks[todolistId], newTask]
        setTasks(copyState)
    }
    let changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const copyState: NewTaskStateType = {...tasks}
        copyState[todolistId] = tasks[todolistId].map((t)=> t.id === taskId ? {...t, isDone: newIsDone}: t)
        setTasks(copyState)
    }
    let changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        const copyState: NewTaskStateType = {...tasks}
        copyState[todolistId] = tasks[todolistId].map((t)=> t.id === taskId ? {...t, title: newTitle}: t)
        setTasks(copyState)
    }
    //======================Render=======================

    const mappedTodoList = todoLists.map((tl) => {

        let tasksForRender = tasks[tl.id]
        if(tl.filter === "active") {
            tasksForRender = tasksForRender.filter(t => !t.isDone)
        }
        if(tl.filter  === "completed") {
            tasksForRender = tasksForRender.filter(t => t.isDone)
        }


        return(
            <div>
                <Todolist
                    key={tl.id}
                    todoId={tl.id}
                    title={tl.title}
                    tasks ={tasksForRender}
                    addTask={addTask}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoLists={removeTodoLists}
                    filter={tl.filter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            </div>
        )
    })

  return (
    <div className="App">
        <AddItemForm addItem={addTodoLists}/>
            {mappedTodoList}
    </div>
  );
}

export default App;
