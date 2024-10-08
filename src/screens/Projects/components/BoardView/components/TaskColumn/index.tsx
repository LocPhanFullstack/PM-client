import { ITask } from "@/src/shared/types";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { Task, TaskStatus } from "./components";

type TaskColumnProps = {
  status: string;
  tasks: ITask[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`xl:py-4 rounded-lg w-full h-full ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <TaskStatus
        status={status}
        tasks={tasks}
        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
      />
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};
