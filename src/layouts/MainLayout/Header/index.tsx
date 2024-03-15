"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { EPath } from "@/constants/path";
import { LogOut } from "lucide-react";

const ToggleMode = dynamic(() => import("@/components/Button/ToggleMode"), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    router.push(EPath.AUTH);
  };

  return (
    <div className="w-full h-header p-3 border-b">
      <div className="h-full flex justify-between items-center">
        <Link href={EPath.DASHBOARD}>
          <div className="px-3 py-2 rounded-md hover:opacity-80 hover:bg-black/15 transition">
            Dashboard
          </div>
        </Link>
        <div className="flex items-center">
          <ToggleMode />
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:opacity-80 hover:bg-black/15 transition"
            onClick={handleSignOut}
          >
            Sign out
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
