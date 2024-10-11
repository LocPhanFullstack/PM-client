"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { SettingsScreen } from "@/src/screens";

const Settings = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Settings]}>
      <SettingsScreen />
    </MainLayout>
  );
};

export default Settings;
