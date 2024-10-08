"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  };

  console.log(theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="text-xs rounded size-7 animate-pulse" />;
  }

  return (
    <button
      className="hover:bg-content-surface rounded p-2"
      onClick={handleClick}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 cursor-pointer" />
      ) : (
        <Moon className="h-6 w-6 cursor-pointer" />
      )}
    </button>
  );
};
