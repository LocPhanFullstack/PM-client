import { useGetTasksQuery } from "@/src/api";
import { Loading } from "@/src/components";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useTheme } from "next-themes";
import React, { useMemo, useState } from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

export const TimelineView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { theme } = useTheme();
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="flex flex-col gap-4 pt-4">
      {isLoading && <Loading loadingStyle="clip-loader" size={60} />}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-border px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={theme === "dark" ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={theme === "dark" ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="pb-5 px-4">
          <button
            className="flex items-center text-white rounded bg-blue-primary px-3 py-2 hover:opacity-70"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};
