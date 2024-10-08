import { ITask } from "@/src/shared/types";
import { DragSourceMonitor, useDrag } from "react-dnd";
import Image from "next/image";
import { TaskContent, TaskFooter } from "./components";

type Props = {
  task: ITask;
};

export const Task = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(instance) => {
        if (instance) {
          drag(instance);
        }
      }}
      className={`mb-4 rounded-md shadow ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6 bg-background">
        <TaskContent task={task} />
        <TaskFooter task={task} />
      </div>
    </div>
  );
};
