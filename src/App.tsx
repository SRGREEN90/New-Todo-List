import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
  const todoListTitle: string = 'What to learn?'

  const taskInitialState: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 1, title: 'CSS', isDone: false},
    {id: 1, title: 'JS', isDone: false},
    {id: 1, title: 'TypeScript', isDone: false},
    {id: 1, title: 'React', isDone: true}
  ]





  return (
    <div className="App">
       <Todolist
           tasks ={taskInitialState}
           title={todoListTitle}
       />

    </div>
  );
}

export default App;
