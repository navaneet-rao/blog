//
// Layout.tsx 
// contains the layout of the application, including the Navbar and Footer components.
// It also sets the theme based on the user's preference stored in local storage.
// The layout component wraps around the main content of the application.
//


import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar"; // Adjust the path as needed
import { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  
   useEffect(() => {
     const selectedTheme = localStorage.getItem("theme") || "light";
     document.body.classList.add(selectedTheme);

     // Update the theme dynamically when the user selects a new theme
     const handleThemeChange = () => {
       const newTheme = localStorage.getItem("theme") || "light";
       document.body.classList.remove("light", "dark");
       document.body.classList.add(newTheme);
     };

     // Listen for theme change
     window.addEventListener("storage", handleThemeChange);

     return () => {
       window.removeEventListener("storage", handleThemeChange);
     };
   }, []);


  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-1 mt-10 md:mt-0">{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;
