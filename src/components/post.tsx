import React from "react";
import { Draggable } from "react-beautiful-dnd";

export type Todo = { id: string; text: string; status: "active" | "completed" };

function Post(props: {
  index: number;
  theme: string;
  todo: Todo;
  removePost: (postId: string) => void;
  setStatus: (postId: string, status: Todo["status"]) => void;
}) {
  const { todo } = props;

  return (
    <>
      <Draggable key={todo.id} draggableId={todo.id} index={props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={`post ${props.theme}`}
              onClick={() =>
                props.setStatus(
                  todo.id,
                  todo.status === "active" ? "completed" : "active"
                )
              }
            >
              <div
                className={`button-${todo.status}`}
                onClick={() =>
                  props.setStatus(
                    todo.id,
                    todo.status === "active" ? "completed" : "active"
                  )
                }
              >
                <div className={`circle-${todo.status} ${props.theme}`}></div>
              </div>

              <h3 id={todo.status} className={`${props.theme}`}>
                {todo.text}
              </h3>
              <img
                id="cross"
                src="/images/icon-cross.svg"
                alt=""
                onClick={(e) => {
                  props.removePost(todo.id);
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Post;
