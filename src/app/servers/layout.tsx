import { ReactNode } from "react";
import NavigationSidebar from "@/components/navigation/NagivationSidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="md:pl-[72px] h-full">{children}</div>
    </div>
  );
}
