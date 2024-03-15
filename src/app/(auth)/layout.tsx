import { ReactNode } from "react";

import Layout from "@/layouts/AuthLayout";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
