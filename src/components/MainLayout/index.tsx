import React from "react";
import { Breadcrumbs } from "../DataDisplay";
import { Breadcrumb } from "../DataDisplay/Breadcrumbs/types";
import { Sidebar } from "./components";

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export function MainLayout(props: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-content-surface">
      <Sidebar />

      <div className="relative flex h-screen grow flex-col overflow-auto">
        {props.breadcrumbs && (
          <div className="sticky top-0 z-[1000] p-4">
            <Breadcrumbs items={props.breadcrumbs} />
          </div>
        )}
        <div className="p-4 pt-0">{props.children}</div>
      </div>
    </div>
  );
}
