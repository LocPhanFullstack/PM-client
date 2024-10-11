"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { SearchScreen } from "@/src/screens";

const Project = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Search]}>
      <SearchScreen />
    </MainLayout>
  );
};

export default Project;
