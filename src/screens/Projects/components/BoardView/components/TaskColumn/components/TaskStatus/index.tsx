import { ITask } from "@/src/shared/types";
import { EllipsisVertical, Plus } from "lucide-react";

type Props = {
  status: string;
  tasks: ITask[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const TaskStatus = ({ tasks, status, setIsModalNewTaskOpen }: Props) => {
  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#E56997",
  };

  return (
    <div className="mb-3 flex">
      <div
        className={`w-2 rounded-s-lg`}
        style={{ backgroundColor: statusColor[status] }}
      />
      <div className="flex w-full items-center justify-between rounded-e-lg bg-background px-5 py-4">
        <h3 className="flex items-center text-lg font-semibold">
          {status}{" "}
          <span
            className="ml-2 inline-block rounded-full p-1 text-center text-sm leading-none bg-content-surface"
            style={{ width: "1.5rem", height: "1.5rem" }}
          >
            {tasksCount}
          </span>
        </h3>
        <div className="flex items-center gap-1">
          <button className="flex h-6 w-5 items-center justify-center hover:opacity-70">
            <EllipsisVertical size={26} />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded bg-content-surface hover:opacity-70"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
