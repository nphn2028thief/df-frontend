"use client";

import { ReactNode } from "react";
import { ThemeProvider as Provider } from "next-themes";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <Provider attribute="class">{children}</Provider>;
};

export default ThemeProvider;
