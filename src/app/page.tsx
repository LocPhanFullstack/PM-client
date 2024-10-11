"use client";

import { MainLayout } from "../components";
import { Breadcrumb } from "../components/DataDisplay/Breadcrumbs/types";
import { HomeScreen } from "../screens";
const Home = () => {
  return (
    <MainLayout breadcrumbs={[Breadcrumb.Home]}>
      <HomeScreen />
    </MainLayout>
  );
};

export default Home;
