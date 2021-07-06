import React, { useEffect, useState } from 'react';
import './App.css';
import Post, { Todo } from './components/post';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([] as Todo[]);
  const [theme, setTheme] = useState("dark")
  

  if (theme === "light") {
    document.body.style.backgroundColor = "hsl(236, 33%, 92%)";
    document.body.style.color = "hsl(236, 9%, 61%)";
  } else {
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    document.body.style.color = "hsl(233, 14%, 35%)";
  }

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


  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  }



  return (
    <>
      <div className={`header ${theme}`}>
        <h1>T O D O</h1>
        <img id="theme" src={theme === "light" ? "/images/icon-moon.svg" : "/images/icon-sun.svg"} alt="" onClick={() => theme === "light" ? setTheme("dark") : setTheme("light")} />
        <div className={`input ${theme}`}>
          <div className="button"></div>

          <input type="text" value={input} placeholder="Whats your plan for today?" onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} onChange={(e) => setInput(e.currentTarget.value)} className={`${theme}`} />

        </div>



      </div>

      <div className={`container ${theme}`}>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          
          <Droppable droppableId="list">

            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >

            {todos.filter(todo => {
              if (statusToShow === "all") { return true }
              return todo.status === statusToShow

            }).map((todo, index) => (

              <Post index={index} theme={theme} todo={todo} key={todo.id} removePost={postId => setTodos(todos.filter(item => item.id !== postId))}
                setStatus={(postId, status) => {
                  setTodos(todos.map(item => {
                    if (item.id === postId) { return ({ ...item, status: status }) }
                    return item
                  }))
                }} />
            ))}
            


              {provided.placeholder}
              </div>
            )}
          </Droppable>

           
            
          
        </DragDropContext>

          <div className="footer">
            <p id="items" >{todos.filter(todo => todo.status === 'active').length} items left </p>
            <p onClick={() => setStatusToShow("all")} style={{ color: statusToShow === 'all' ? 'hsl(220, 98%, 61%)' : 'hsl(234, 11%, 52%)' }} className={`${theme}`} id="all">All</p>
            <p onClick={() => setStatusToShow("active")} style={{ color: statusToShow === 'active' ? 'hsl(220, 98%, 61%)' : 'hsl(234, 11%, 52%)' }} className={`${theme}`} id="activebar">Active</p>
            <p onClick={() => setStatusToShow("completed")} style={{ color: statusToShow === 'completed' ? 'hsl(220, 98%, 61%)' : 'hsl(234, 11%, 52%)' }} className={`${theme}`} id="completedbar">Completed</p>
            <p onClick={() => { setTodos(todos.filter(todo => todo.status !== "completed")) }} className={`${theme}`}>Clear Completed</p>
          </div>
      </div>

      <div className="foo">
        <div className={`ter ${theme}`}></div>
      </div>

    
        <h4>Drag and drop to reorder list</h4>



    </>
      );
}

      export default App;

