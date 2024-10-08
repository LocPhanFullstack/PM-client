import { useCreateProjectMutation } from "@/src/api";
import { Modal } from "@/src/components";
import { IApiError } from "@/src/shared/types";
import { formatISO } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFormData({
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleSubmit = async () => {
    const { projectName, description, startDate, endDate } = formData;
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    try {
      await createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap(); // This unwraps the promise, so it throws if there's an error.
      toast.success("Create project successfully!!!");
      resetForm();
      onClose();
    } catch (err: unknown) {
      // Use type assertion to access the message safely
      const error = err as IApiError; // Assert the error type
      const errorMessage =
        error.data?.message || "Failed to create project. Please try again.";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const isFormValid = () => {
    const { projectName, description, startDate, endDate } = formData;
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-border dark:border-dark-tertiary dark:bg-dark-tertiary p-2 shadow-sm";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) => handleInputChange("projectName", e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
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
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`mt-4 flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium shadow-sm hover:opacity-60 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </Modal>
  );
};
