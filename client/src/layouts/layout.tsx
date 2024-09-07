import Navbar from "../components/Navbar/Navbar"; // Adjust the path as needed
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <footer/>
    </div>
  );
};

export default Layout;
