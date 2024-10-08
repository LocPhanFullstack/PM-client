"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  BoardView,
  ListView,
  ModalNewTask,
  ProjectHeader,
  TableView,
  TimelineView,
} from "./components";

export const ProjectsScreen = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // Ensure id is a string
  const projectId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="w-full h-full">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "List" && (
        <ListView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Timeline" && (
        <TimelineView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Table" && (
        <TableView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};
