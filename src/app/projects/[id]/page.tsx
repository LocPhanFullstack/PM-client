"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { ProjectsScreen } from "@/src/screens/Projects";

const Project = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Project]}>
      <ProjectsScreen />
    </MainLayout>
  );
};

export default Project;
