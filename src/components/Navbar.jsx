import React from "react";
import Jdeam from "./logo/Jdeam";
import SearchBar from "./games/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvatarDisplay from "./AvatarDisplay";

const Navbar = () => {
  const { session, signOut, getUserData } = useAuth();
  const userData = getUserData();
  const handleLogout = async () => {
    const result = await signOut();
    if (result.error) {
      
    } else {
      
    }
  };

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Giochi",
      href: "/games",
    },
    {
      label: "Categorie",
      href: "/categories",
    },
    {
      label: session ? "Logout" : "Accedi",
      href: session ? "#" : "/login",
      onClick: session ? handleLogout : undefined,
    },
  ];

  return (
    <>
      <div className="bg-neutral-900 shadow-soft">
        {/* Mobile Navigation */}
        <nav className="navbar bg-neutral-900 text-neutral-100 border-b border-neutral-800 shadow-medium lg:hidden fixed top-0 left-0 w-full z-50">
          <div className="navbar-start">
            {/* Drawer Menu */}
            <div className="drawer">
              <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="mobile-drawer"
                  className="drawer-button p-3 cursor-pointer rounded-xl hover:bg-neutral-800 transition-all duration-200"
                >
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
              </div>

              {/* Side Drawer Menu */}
              <div className="drawer-side">
                <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
                <ul className="menu bg-neutral-100 text-neutral-900 min-h-full w-80 p-6 space-y-3">
                  <li className="text-xl font-bold mb-4 text-primary-600">Menu</li>
                  {links.map((link) => (
                    <li key={link.label} className="border-b border-neutral-200 w-full">
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 font-medium"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className="block px-4 py-3 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="navbar-center">
            <Link to="/" className="text-xl font-bold tracking-wide font-display">
              <Jdeam />
            </Link>
          </div>

          {/* Profile Button */}
          <div className="navbar-end">
            <button
              className="btn btn-ghost btn-circle hover:bg-neutral-800 transition-all duration-200"
              onClick={() => (window.location.href = "/profile")}
            >
              <i className="bi text-xl bi-person-circle"></i>
            </button>
          </div>
        </nav>
        
        {/* Desktop Navigation */}
        <nav className="navbar bg-neutral-900 text-neutral-100 hidden lg:flex">
          <div className="flex justify-center items-center w-full">
            <Link to="/" className="text-2xl font-bold tracking-wide font-display">
              <Jdeam />
            </Link>
          </div>
        </nav>
        
        <nav className="navbar bg-neutral-900 border-b border-neutral-800 text-neutral-100 hidden lg:flex">
          <ul className="flex justify-center gap-12 w-full">
            {links.map((link) => {
              return (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-lg font-medium border-b-2 border-transparent hover:border-primary-500 hover:text-primary-300 hover:font-semibold hover:translate-y-[-2px] transition-all duration-300 px-2 py-1"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.href} className="text-lg font-medium border-b-2 border-transparent hover:border-primary-500 hover:text-primary-300 hover:font-semibold hover:translate-y-[-2px] transition-all duration-300 px-2 py-1">
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
          <Link to="/profile" className="absolute right-6 hover:scale-110 transition-all duration-300">
               <AvatarDisplay url={userData?.avatarUrl} size={40} className="w-10 h-10 " />
          </Link>
        </nav>
        
        {/* Search Bar */}
        <nav className="flex justify-center bg-neutral-900 items-center lg:w-3/4 mx-auto py-4">
          <SearchBar />
        </nav>
      </div>
    </>
  );
};

export default Navbar; 