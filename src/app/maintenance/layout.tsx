import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/ui/CustomUI/SidebarToggle";
import NavBar from "@/components/ui/CustomUI/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Property Asset Registry System Login Page",
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
