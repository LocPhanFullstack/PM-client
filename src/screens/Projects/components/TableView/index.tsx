import { useGetTasksQuery } from "@/src/api";
import { Header, Loading } from "@/src/components";
import { dataGridClassNames, dataGridSxStyles } from "@/src/configs/libs";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import { columns } from "./data";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { theme } = useTheme();
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] flex flex-col justify-center gap-4 w-full pt-4">
      {isLoading && <Loading loadingStyle="clip-loader" size={60} />}
      <Header
        name="Table"
        buttonComponent={
          <button
            className="flex items-center bg-blue-primary text-white rounded-lg px-3 py-2 hover:opacity-60"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        }
        isSmallText
      />
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(theme === "dark")}
      />
    </div>
  );
};
