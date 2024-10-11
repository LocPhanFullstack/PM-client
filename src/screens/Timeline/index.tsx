"use client";

import { useGetProjectsQuery } from "@/src/api";
import { Header, Loading } from "@/src/components";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useTheme } from "next-themes";
import React, { useMemo, useState } from "react";

type TaskTypeItems = "task" | "milestone" | "project";

export const TimelineScreen = () => {
  const { theme } = useTheme();
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full">
      <header className="mb-4 flex items-center justify-between">
        {isLoading && (
          <Loading
            loadingStyle="clip-loader"
            cssOverride={{ marginTop: "20px" }}
            size={60}
          />
        )}
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 px-4 py-2 pr-8 leading-tight shadow"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={theme === "dark" ? "#101214" : "#1f2937"}
            projectProgressColor={theme === "dark" ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={theme === "dark" ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};
