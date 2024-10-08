import React, { useState } from "react";
import { formatISO } from "date-fns";
import { useCreateTaskMutation } from "@/src/api";
import { Priority, Status } from "@/src/shared/enums";
import { Modal } from "@/src/components";
import { toast } from "react-toastify";
import { IApiError } from "@/src/shared/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

export const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: Status.ToDo,
    priority: Priority.Backlog,
    tags: "",
    startDate: "",
    dueDate: "",
    authorUserId: "",
    assignedUserId: "",
    projectId: "",
  });

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { title, authorUserId, projectId } = formData;

    if (!title || !authorUserId || !(id || projectId)) return;

    const formattedStartDate = formatISO(new Date(formData.startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(formData.dueDate), {
      representation: "complete",
    });

    try {
      await createTask({
        ...formData,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(formData.assignedUserId),
        projectId: id ? Number(id) : Number(projectId),
      }).unwrap();
      toast.success("Task created successfully!");
      resetForm();
    } catch (err) {
      const error = err as IApiError;
      toast.error(`Error: ${error.data?.message || "Failed to create task."}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: Status.ToDo,
      priority: Priority.Backlog,
      tags: "",
      startDate: "",
      dueDate: "",
      authorUserId: "",
      assignedUserId: "",
      projectId: "",
    });
  };

  const fields: (keyof typeof formData)[] = [
    "title",
    "description",
    "tags",
    "authorUserId",
    "assignedUserId",
    "projectId",
  ];

  const isFormValid = () =>
    formData.title && formData.authorUserId && (id || formData.projectId);

  const selectStyles =
    "block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fields.map((field) => (
          <input
            key={field}
            type={field === "tags" ? "text" : "text"}
            className={inputStyles}
            placeholder={
              field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, " $1")
            }
            value={formData[field]}
            onChange={(e) =>
              handleInputChange(field as keyof typeof formData, e.target.value)
            }
          />
        ))}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status.replace(/([A-Z])/g, " $1")}
              </option>
            ))}
          </select>
          <select
            className={selectStyles}
            value={formData.priority}
            onChange={(e) =>
              handleInputChange(
                "priority",
                Priority[e.target.value as keyof typeof Priority]
              )
            }
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>
                {priority.replace(/([A-Z])/g, " $1")}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};
