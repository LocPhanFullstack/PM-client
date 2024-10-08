// TaskDetails.tsx
import React from "react";
import { ITask } from "@/src/shared/types";
import { formatDate } from "@/src/configs/utils/components";

type Props = {
  task: ITask;
};

export const TaskContent = ({ task }: Props) => {
  const details = [
    { label: "ID", value: task.id },
    { label: "Title", value: task.title },
    {
      label: "Description",
      value: task.description || "No description provided",
    },
    { label: "Status", value: task.status },
    { label: "Priority", value: task.priority },
    {
      label: "Start Date",
      value: task.startDate ? formatDate(task.startDate) : "Not set",
    },
    {
      label: "Due Date",
      value: task.dueDate ? formatDate(task.dueDate) : "Not set",
    },
    { label: "Author", value: task.author ? task.author.username : "Unknown" },
    {
      label: "Assignee",
      value: task.assignee ? task.assignee.username : "Unassigned",
    },
  ];

  return (
    <>
      {details.map((item, index) => (
        <p key={index}>
          <strong>{item.label}: </strong>
          {item.value}
        </p>
      ))}
    </>
  );
};
