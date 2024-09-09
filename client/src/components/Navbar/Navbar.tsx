import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>("light");

  const NavLinks = () => {
    return (
      <div className="flex flex-col md:flex-row md:space-x-4">
        <a href="/newfeed" className="block text-text-1">
          New Feed
        </a>
        <a href="/dashboard" className="block text-text-1">
          Dashboard
        </a>
      </div>
    );
  };

  const ToggleSwitch = () => {
    return (
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={theme === "dark"}
          onChange={handleThemeChange}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className="ml-3 text-lg font-medium text-text-1">
          {theme === "dark" ? "Dark" : "Light"} Theme
        </span>
      </label>
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply the theme to the body
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  return (
    <nav className="fixed z-10 w-full bg-background-nav p-6">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/home" className="text-text-1">
            Logo
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-text-1 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <div className="hidden items-center space-x-6 md:flex">
          <NavLinks />
          <ToggleSwitch />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 h-screen space-y-4 md:hidden">
          <NavLinks />
          <ToggleSwitch />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
