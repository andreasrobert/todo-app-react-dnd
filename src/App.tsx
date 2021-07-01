import React, { useEffect, useState } from 'react';
import './App.css';
import Post, { Todo } from './components/post'


function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    // {name: "mickey"},{name: "mickey1"},{name: "mickey2"},{name: "mickey"}
  ] as Todo[]);


  const [statusToShow, setStatusToShow] = useState("all" as 'all' | "active" | 'completed')

  const addTodo = (event: { key: string; }) => {
    if (event.key === 'enter') {
      console.log("add a todo")
    }

  }


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


  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    setTodos([...todos,{id: `${(new Date()).toISOString()}`,text:e.currentTarget.value, status:"active"}]);
    setInput("");

  }

  return (
    <>
      <div className="header">
        <h1>T O D O</h1>
        <img id="theme" src="/images/icon-sun.svg" alt="" />
        <div className="input">
          <div className="button"></div>

          {/* <input type="text" value={input} placeholder="Whats your plan for today?"  onKeyDown={(e) => e.key === 'enter' && setTodos(e)}   onChange={(event)=> setInput(event.target.value)}/> */}

          {/* <input type="text" value={input} placeholder="Whats your plan for today?" onKeyDown={(e) => e.key ==='Enter' && console.log((e.target as HTMLInputElement).value)} onChange={(e)=> setInput(e.target.value)} /> */}

          {/* <input type="text" value={input} placeholder="Whats your plan for today?" onKeyDown={(e) => e.key === 'Enter' && setTodos([...todos, e.currentTarget.value])} onChange={(e) => setInput(e.currentTarget.value)} /> */}

          <input type="text" value={input} placeholder="Whats your plan for today?" onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} onChange={(e) => setInput(e.currentTarget.value)} />

        </div>



      </div>

      <div className="container">
        {todos.filter(todo=>{
          if(statusToShow === "all") {
            return true
          } 
          return todo.status === statusToShow
          

        }).map(todo => (

          <Post todo={todo} removePost={(postId) => {
            console.log(postId);
            setTodos(todos.filter(item => item.id !== postId))
          }} key={todo.id} />
        ))}




        <div className="footer">
          <p id="items">{ } items left</p>
          <p onClick={()=>setStatusToShow("all")} >All</p>
          <p onClick={()=>setStatusToShow("active")} >Active</p>
          <p id="completed" onClick={()=>setStatusToShow("completed")}>Completed</p>
          <p>Clear Completed</p>
        </div>
      </div>

      <h4>Drag and drop to reorder list</h4>



    </>
  );
}

export default App;

