import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

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
  const todoListTitle: string = 'What to learn?'
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
           {id: v1(), title: 'HTML', isDone: true},
           {id: v1(), title: 'CSS', isDone: false},
           {id: v1(), title: 'JS', isDone: false},
           {id: v1(), title: 'TypeScript', isDone: false},
           {id: v1(), title: 'React', isDone: true}
       ],
   })

   const [filter, setFilter] = useState<FilterValuesType>('all')

    //===================TodolistFunctions=======================
    let changeTodolistStatus = (todolistId: string, newFilter: FilterValuesType) => {
      let updatedTodolists = todoLists.map((tl) => tl.id === todolistId ?
      {...tl, filter: newFilter }: tl)
        setTodoLists(updatedTodolists)
    }

    //===================TaskFunctions=======================
    let taskFilter = (filterValue: FilterValuesType) =>{
        setFilter(filterValue)
    }
    let removeTasks = (taskId: number) => {
       let tasksAfterRemove = tasks.filter(t => t.id !== taskId)
         setTasks(tasksAfterRemove)
    }
    let addTask = (newTitle: string) => {
      let newTask = {id: 6, title: newTitle, isDone: false}
        setTasks([...tasks, newTask])
    }
    let changeTaskStatus = (taskId: number, newIsDone: boolean) => {
        setTasks(tasks.map((t)=> t.id === taskId ? {...t, isDone: newIsDone}: t))
    }

    let tasksForTodolist = tasks
    if(filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    //======================Render=======================

  return (
    <div className="App">
       <Todolist
           tasks ={tasksForTodolist}
           title={todoListTitle}
           taskFilter={taskFilter}
           removeTasks={removeTasks}
           addTask={addTask}
           changeTaskStatus={changeTaskStatus}
       />

    </div>
  );
}

export default App;
