import React from "react";
import { PriorityTag } from "../PriorityTask";
import { ITask } from "@/src/shared/types";
import { EllipsisVertical } from "lucide-react";
import { formatDate } from "@/src/configs/utils/components";

export const TaskContent = ({ task }: { task: ITask }) => {
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {task.priority && <PriorityTag priority={task.priority} />}
          <div className="flex gap-2">
            {taskTagsSplit.map((tag) => (
              <div
                key={tag}
                className="rounded-full bg-purple-400 px-2 py-1 text-xs"
              >
                {" "}
                {tag}
              </div>
            ))}
          </div>
        </div>
        <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center">
          <EllipsisVertical size={26} />
        </button>
      </div>
      <div className="my-3 flex justify-between">
        <h4 className="text-md font-bold">{task.title}</h4>
        {typeof task.points === "number" && (
          <div className="text-xs font-semibold">{task.points} pts</div>
        )}
      </div>

      <div className="text-xs text-tertiary">
        <span>{formatDate(task.startDate)} - </span>
        <span>{formatDate(task.dueDate)}</span>
      </div>
      <p className="text-sm">{task.description}</p>
      <div className="mt-4 border-t border-border"></div>
    </>
  );
};
