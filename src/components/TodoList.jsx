import SingleTodo from "./SingleTodo";
import { Droppable } from "@hello-pangea/dnd";

const TodoList = ({
  activeTasks,
  setActiveTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-3 w-full mt-2">
      <Droppable droppableId="TodoItems" type="group">
        {(provided, snapshot) => (
          <div
            className={`bg-custom-50 p-4 rounded-md ${
              snapshot.isDraggingOver ? "bg-[rgb(0, 221, 236)]" : ""
            }  text-white`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-[30px]">Active Tasks</span>
            {activeTasks?.length > 0 && (
              <div className="flex flex-col gap-2 my-4">
                {activeTasks.map((task, index) => {
                  return (
                    <SingleTodo
                      key={task.id}
                      index={Number(index)}
                      task={task}
                      todos={activeTasks}
                      setTodos={setActiveTasks}
                    />
                  );
                })}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="CompleteTodos" type="group">
        {(provided, snapshot) => (
          <div
            className={`bg-custom-100 p-4 rounded-md  ${
              snapshot.isDraggingOver
                ? "bg-[rgb(255, 38, 0)]"
                : "bg-[rgb(235, 103, 80)]"
            } text-white`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-[30px]">Completed Tasks</span>
            {completedTasks?.length > 0 && (
              <div className="flex flex-col gap-2 my-4">
                {completedTasks.map((task, index) => {
                  return (
                    <SingleTodo
                      key={task.id}
                      index={Number(index)}
                      task={task}
                      todos={completedTasks}
                      setTodos={setCompletedTasks}
                    />
                  );
                })}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
