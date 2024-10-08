export enum Breadcrumb {
  Home = "Home",
  Project = "Project",
  Settings = "Settings",
  Timeline = "Timeline",
}

export interface BreadcrumbData {
  label: string;
  path: string;
}
