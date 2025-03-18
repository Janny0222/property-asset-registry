import type { Metadata } from "next";
import "../globals.css";



export const metadata: Metadata = {
  title: "Login",
  description: "Property Asset Registry System Login Page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white min-h-screen">
      {children}
    </div>      
  );
}
