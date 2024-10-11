"use client";

import { MainLayout } from "@/src/components";
import { Breadcrumb } from "@/src/components/DataDisplay/Breadcrumbs/types";
import { UsersScreen } from "@/src/screens";

const Users = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Users]}>
      <UsersScreen />
    </MainLayout>
  );
};

export default Users;
