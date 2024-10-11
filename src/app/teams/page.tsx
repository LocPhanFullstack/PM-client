"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { TeamsScreen } from "@/src/screens/Teams";

const Teams = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Teams]}>
      <TeamsScreen />
    </MainLayout>
  );
};

export default Teams;
