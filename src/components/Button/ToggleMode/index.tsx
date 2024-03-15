"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleMode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleRenderIcon = () => {
    if (theme === "dark") {
      return <Moon />;
    }

    return <Sun />;
  };

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="transition-all duration-100 dark:text-white text-gray-800 p-3 text-2xl md:text-4xl rounded-full"
    >
      {handleRenderIcon()}
    </button>
  );
};

export default ToggleMode;
