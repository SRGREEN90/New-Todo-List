import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
  const todoListTitle: string = 'What to learn?'
  const taskInitialState: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: false},
    {id: 3, title: 'JS', isDone: false},
    {id: 4, title: 'TypeScript', isDone: false},
    {id: 5, title: 'React', isDone: true}
  ]

   const [tasks, setTasks] = useState(taskInitialState)
   const [filter, setFilter] = useState<FilterValuesType>('all')
//===================Functions=======================

    let taskFilter = (filterValue: FilterValuesType) =>{
        setFilter(filterValue)
    }
    let removeTasks = (taskId: number) =>{
       let tasksAfterRemove = tasks.filter(t => t.id !== taskId)
         setTasks(tasksAfterRemove)
    }

    let tasksForTodolist = tasks
    if(filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
  return (
    <div className="App">
       <Todolist
           tasks ={tasksForTodolist}
           title={todoListTitle}
           taskFilter={taskFilter}
           removeTasks={removeTasks}
       />

    </div>
  );
}

export default App;
