"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.png";
import { Briefcase, LockIcon, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/app/redux";
import { setIsSidebarCollapsed } from "@/src/state";
import classNames from "classnames";
import { useGetProjectsQuery } from "@/src/api";
import { sideBarGroups, SideBarItem } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const location = usePathname();
  const dispatch = useAppDispatch();
  const { data: projects } = useGetProjectsQuery();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  // Map projects to sidebar items
  const projectItems: SideBarItem[] =
    projects?.map((project) => ({
      title: project.name, // Assuming project has a 'name' field
      icon: (
        <div className="flex h-6 w-6 items-center justify-center">
          <Briefcase size={18} /> {/* Use an appropriate icon */}
        </div>
      ),
      location: `/projects/${project.id}`, // Assuming each project has an 'id'
    })) || [];

  // Check for loading or error states

  // Add project items to the sidebar groups
  const updatedSideBarGroups = [
    ...sideBarGroups.slice(0, 1), // Overview
    {
      name: "Projects",
      items: projectItems,
    },
    ...sideBarGroups.slice(2), // Priority and any other groups
  ];
  return (
    <div
      className={`sticky top-0 hidden bg-background h-screen w-64 shrink-0 overflow-y-auto shadow ${
        isSidebarCollapsed ? "hidden" : "md:block"
      }`}
    >
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Logo */}
        <div className="z-50 flex min-h-[56px] px-6 py-2 w-64 items-center justify-between">
          <div className="text-xl font-bold">EDLIST</div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide">EDROH TEAM</h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs">Private</p>
            </div>
          </div>
        </div>
        {/* Nav links */}
        <div className="flex flex-col px-5 gap-4">
          {updatedSideBarGroups.map((group, idx1) => (
            <React.Fragment key={idx1}>
              <div className="select-none">
                <div className="p-2.5 font-normal text-tertiary">
                  {group.name}
                </div>
                <div className="flex flex-col">
                  {group.items.map((item, idx2) => {
                    const isMatched = location === item.location;
                    if (item.isActive === false) {
                      return (
                        <div
                          key={idx2}
                          className={classNames(
                            "flex cursor-not-allowed items-center gap-2 rounded-lg p-2.5 font-medium opacity-50"
                          )}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                      );
                    } else {
                      return (
                        <Link
                          href={item.location}
                          key={idx2}
                          className="w-full"
                        >
                          <div
                            className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-content-surface ${
                              isMatched ? "bg-content-surface" : ""
                            } justify-start p-2.5 py-3`}
                          >
                            {isMatched && (
                              <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"></div>
                            )}
                            {item.icon}
                            <span className={`font-medium`}>{item.title}</span>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
              {idx1 < sideBarGroups.length - 1 && (
                <div className="border-b border-border" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
