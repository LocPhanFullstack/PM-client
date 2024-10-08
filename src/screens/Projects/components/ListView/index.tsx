import { useGetTasksQuery } from "@/src/api";
import { Header, Loading } from "@/src/components";
import React from "react";
import { TaskCard } from "./components";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="pt-4 flex flex-col gap-4">
      {isLoading && <Loading loadingStyle="clip-loader" size={60} />}
      <Header
        name="List"
        buttonComponent={
          <button
            className="flex items-center text-white bg-blue-primary rounded-lg px-3 py-2 hover:opacity-60"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        }
        isSmallText
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg-gap-6">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};
