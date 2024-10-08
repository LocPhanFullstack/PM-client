type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

export const TabButton = ({
  name,
  icon,
  setActiveTab,
  activeTab,
}: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};
