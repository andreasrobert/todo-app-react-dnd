import React from 'react';
import { toEditorSettings } from 'typescript';

export type Todo={id:string,text:string,status:'active' | 'completed'}

function Post(props: {
    todo: Todo, removePost: (postId: string) => void
}) {
    const { todo } = props;

    return (
        <div className="post">
            <div className="button"></div>

            <h3>{todo.text}</h3>
            <img id="cross" src="/images/icon-cross.svg" alt="" onClick={(e) => props.removePost(todo.id) } />

        </div>

    );
}



export default Post;