import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  House,
  Layers3,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";

export interface SideBarItem {
  title: string;
  icon: React.ReactNode;
  location: string;
  isActive?: boolean;
}

interface SideBarGroup {
  name: string;
  items: SideBarItem[];
}

export const sideBarGroups: SideBarGroup[] = [
  {
    name: "Overview",
    items: [
      {
        title: "Home",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <House size={18} />
          </div>
        ),
        location: "/",
      },
      {
        title: "Timeline",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <Briefcase size={18} />
          </div>
        ),
        location: "/timeline",
      },
      {
        title: "Search",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <Search size={18} />
          </div>
        ),
        location: "/search",
      },
      {
        title: "Settings",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <Settings size={18} />
          </div>
        ),
        location: "/settings",
      },
      {
        title: "Users",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <User size={18} />
          </div>
        ),
        location: "/users",
      },
      {
        title: "Teams",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <Users size={18} />
          </div>
        ),
        location: "/teams",
      },
    ],
  },
  {
    name: "Projects",
    items: [],
  },
  {
    name: "Priority",
    items: [
      {
        title: "Urgent",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <AlertCircle size={18} />
          </div>
        ),
        location: "/priority/urgent",
        isActive: false,
      },
      {
        title: "High",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <ShieldAlert size={18} />
          </div>
        ),
        location: "/priority/high",
        isActive: false,
      },
      {
        title: "Medium",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <AlertTriangle size={18} />
          </div>
        ),
        location: "/priority/medium",
        isActive: false,
      },
      {
        title: "Low",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <AlertOctagon size={18} />
          </div>
        ),
        location: "/priority/low",
        isActive: false,
      },
      {
        title: "Backlog",
        icon: (
          <div className="flex h-6 w-6 items-center justify-center">
            <Layers3 size={18} />
          </div>
        ),
        location: "/priority/backlog",
        isActive: false,
      },
    ],
  },
];
