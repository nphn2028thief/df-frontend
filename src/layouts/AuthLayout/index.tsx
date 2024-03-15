import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <main className="h-full relative">{children}</main>;
};

export default AuthLayout;
