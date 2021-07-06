import React, { useEffect, useState } from 'react';
import './App.css';
import Post, { Todo } from './components/post';
import styled from 'styled-components';

const theme = styled.div`


`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([] as Todo[]);

  const [statusToShow, setStatusToShow] = useState("all" as 'all' | "active" | 'completed')

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      const todosFromLocalStorage = window.localStorage.getItem('todos');
      if (todosFromLocalStorage) {
        const parsedTodos = JSON.parse(todosFromLocalStorage) as Todo[];
        setTodos(parsedTodos);
      }
    }

    window.localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTodos([...todos, { id: `${(new Date()).toISOString()}`, text: e.currentTarget.value, status: "active" }]);
    setInput("");
  }

  return (
    <>
      <div className="header">
        <h1>T O D O</h1>
        <img id="theme" src="/images/icon-sun.svg" alt="" />
        <div className="input">
          <div className="button"></div>

          <input type="text" value={input} placeholder="Whats your plan for today?" onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} onChange={(e) => setInput(e.currentTarget.value)} />

        </div>



      </div>

      <div className="container">


        {todos.filter(todo => {
          if (statusToShow === "all") { return true }
          return todo.status === statusToShow

        }).map(todo => (

          <Post todo={todo} key={todo.id} removePost={postId => setTodos(todos.filter(item => item.id !== postId))}
            setStatus={(postId, status) => {
              setTodos(todos.map(item => {
                if (item.id === postId) {return ({ ...item, status: status })}
                return item
              }))
            }} />
        ))}


        <div className="footer">
          <p id="items">{todos.filter(todo => todo.status === 'active').length} items left</p>
          <p onClick={() => setStatusToShow("all")} style={{color: statusToShow === 'all' ? 'hsl(220, 98%, 61%)':'hsl(234, 11%, 52%)'}} >All</p>
          <p onClick={() => setStatusToShow("active")} style={{color: statusToShow === 'active' ? 'hsl(220, 98%, 61%)':'hsl(234, 11%, 52%)'}} >Active</p>
          <p onClick={() => setStatusToShow("completed")} style={{color: statusToShow === 'completed' ? 'hsl(220, 98%, 61%)':'hsl(234, 11%, 52%)'}} id={"completed"} >Completed</p>
          <p onClick={() => { setTodos(todos.filter(todo => todo.status !== "completed")) }}>Clear Completed</p>
        </div>
      </div>

      <h4>Drag and drop to reorder list</h4>



    </>
  );
}

export default App;

