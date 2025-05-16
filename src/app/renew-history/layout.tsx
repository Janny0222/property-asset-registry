import type { Metadata } from "next";
import "../globals.css";
import NavBar from "@/components/ui/CustomUI/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";



export const metadata: Metadata = {
  title: "Permits",
  description: "Property Asset Registry System Permit Page",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
        <NavBar>
            {children}
        </NavBar>
    </SidebarProvider>
  );
}
