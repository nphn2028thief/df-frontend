import { ReactNode } from "react";

import MainLayout from "@/layouts/MainLayout";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
