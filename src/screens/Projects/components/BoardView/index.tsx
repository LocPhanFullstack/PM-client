import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/src/api";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "./components";
import { Loading } from "@/src/components";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading && (
        <Loading
          loadingStyle="clip-loader"
          cssOverride={{ marginTop: "20px" }}
          size={60}
        />
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};
