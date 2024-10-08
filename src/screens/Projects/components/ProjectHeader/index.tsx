import { Header, TabButton } from "@/src/components";
import { Filter, Grid3x3, PlusSquare, Share2 } from "lucide-react";
import React, { useState } from "react";
import { projectTabs } from "./data";
import { ModalNewProject } from "../ModalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <>
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-4">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> New Boards
            </button>
          }
        />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          {projectTabs &&
            projectTabs.map((item, i) => (
              <div key={i}>
                <TabButton
                  name={item.name}
                  icon={item.icon}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              </div>
            ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:opacity-60 text-tertiary">
            <Filter className="h-5 w-5" />
          </button>
          <button className="hover:opacity-60 text-tertiary">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md py-1 pl-10 pr-4 focus:outline-none bg-input dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </>
  );
};
