import React from 'react';

export type Todo={id:string,text:string,status:'active' | 'completed'}


function Post(props:{ todo:Todo, removePost:(postId:string )=> void, setStatus:( postId:string, status:Todo['status']) => void }) 
{
    const { todo } = props;

    return (
        <div className="post">
            <div className={`button-${todo.status}`} onClick={()=> props.setStatus(todo.id, todo.status === "active" ? "completed" : "active")}>
                <div className={`circle-${todo.status}`}></div>
            </div>

            <h3 id={todo.status} onClick={()=> props.setStatus(todo.id, todo.status === "active" ? "completed" : "active")}>{todo.text}</h3>
            <img id="cross" src="/images/icon-cross.svg" alt="" onClick={(e) => props.removePost(todo.id) } />

        </div>
    );
}

export default Post;