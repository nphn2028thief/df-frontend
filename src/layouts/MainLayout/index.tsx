import { ReactNode } from "react";

import Header from "./Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <Header />
      <main className="h-[calc(100%_-_var(--header-height))]">{children}</main>
    </div>
  );
};

export default MainLayout;
