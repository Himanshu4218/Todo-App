import { RiEditFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";

const SingleTodo = ({ index, task, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(task.task);
  const inputRef = useRef(null);

  const handleKeyDown = (e, id) => {
    e.preventDefault();
    setEdit(false);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editedValue } : todo
      )
    );
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((task) => task.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheck = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        } else {
          return t;
        }
      })
    );
  };
  useEffect(() => {
    if (inputRef.current && edit) {
      inputRef.current.focus();
    }
  }, [edit]);
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-between items-center ${
            snapshot.isDragging ? "shadow-lg" : ""
          } gap-5 bg-task-pattern p-5 rounded text-black hover:scale-105 transition-all`}
          onSubmit={(e) => handleKeyDown(e, task.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              type="text"
              className="rounded p-2 outline-none grow"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={() => setEdit(false)}
            />
          ) : (
            <span
              key={task.id}
              className={`text-[20px] ${task.completed ? "line-through" : ""}`}
            >
              {task.task}
            </span>
          )}
          <div className="flex gap-3">
            <RiEditFill
              className="text-[20px] cursor-pointer"
              onClick={() => setEdit(true)}
            />
            <AiFillDelete
              className="text-[20px] cursor-pointer"
              onClick={() => handleDelete(task.id)}
            />
            <IoMdCheckmark
              className="text-[20px] cursor-pointer"
              onClick={() => handleCheck(task.id)}
            />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
