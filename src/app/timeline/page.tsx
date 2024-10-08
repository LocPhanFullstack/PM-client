"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { TimelineScreen } from "@/src/screens/Timeline";

const Project = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Timeline]}>
      <TimelineScreen />
    </MainLayout>
  );
};

export default Project;
