import { useState } from "react";
import { v4 as uuid } from "uuid";
import InputForm from "./components/InputForm.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import TodoList from "./components/TodoList.jsx";

function App() {
  const [task, setTask] = useState("");
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (task === "") return;

    const newTask = {
      id: uuid(),
      task: task,
      completed: false,
    };
    setActiveTasks([...activeTasks, newTask]);
    setTask("");
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = [...activeTasks],
      complete = [...completedTasks];

    if (source.droppableId === "TodoItems") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodoItems") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setActiveTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen w-full bg-sky-600 py-8 px-8 font-margarine">
        <h1 className="text-[40px] font-neucha text-center text-white mb-6">
          Taskify
        </h1>
        <InputForm
          task={task}
          setTask={setTask}
          handleTaskSubmit={handleTaskSubmit}
        />
        <TodoList
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
