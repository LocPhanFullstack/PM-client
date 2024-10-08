import { Clock, Grid3x3, List, Table } from "lucide-react";

interface ProjectTab {
  name: string;
  icon: React.ReactNode;
}

export const projectTabs: ProjectTab[] = [
  {
    name: "Board",
    icon: <Grid3x3 className="h-5 w-5" />,
  },
  {
    name: "List",
    icon: <List className="h-5 w-5" />,
  },
  {
    name: "Timeline",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "Table",
    icon: <Table className="h-5 w-5" />,
  },
];
