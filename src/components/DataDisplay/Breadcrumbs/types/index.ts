export enum Breadcrumb {
  Home = "Home",
  Project = "Project",
  Settings = "Settings",
  Timeline = "Timeline",
  Search = "Search",
  Users = "Users",
  Teams = "Teams",
}

export interface BreadcrumbData {
  label: string;
  path: string;
}
