import { Breadcrumb, BreadcrumbData } from "../types";

export const breadcrumbsData: {
  [key in keyof typeof Breadcrumb]: BreadcrumbData;
} = {
  Home: {
    label: "Home",
    path: "/",
  },
  Project: {
    label: "Project",
    path: "/project/:id",
  },
  Settings: {
    label: "Settings",
    path: "/settings",
  },
  Timeline: {
    label: "Timeline",
    path: "/timeline",
  },
};
