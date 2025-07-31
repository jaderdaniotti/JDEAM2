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
      //console.log("Errore durante il logout: " + result.error.message);
    } else {
      //console.log("Logout completato con successo! 👋");
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
      <div className="bg-scuro">
        {/* schermi piccoli */}
        <nav className="navbar bg-scuro text-chiaro border-b border-scuro-2 shadow-md lg:hidden fixed top-0 left-0 w-full z-50">
          <div className="navbar-start">
            {/* Drawer Menu */}
            <div className="drawer">
              <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="mobile-drawer"
                  className="drawer-button p-3 cursor-pointer rounded-md hover:bg-scuro-2 transition"
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
                <ul className="menu bg-chiaro-2 text-scuro min-h-full w-72 p-4 space-y-2">
                  <li className="text-lg font-semibold mb-2">Menu</li>
                  {links.map((link) => (
                    <li key={link.label} className="border-b w-3/4">
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-200 transition"
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
            <Link to="/" className="text-xl font-bold tracking-wide montserrat">
              <Jdeam />
            </Link>
          </div>

          {/* Profile Button */}
          <div className="navbar-end">
            <button
              className="btn btn-ghost btn-circle hover:bg-scuro-2 transition"
              onClick={() => (window.location.href = "/profile")}
            >
              <i className="bi text-xl bi-person-circle"></i>
            </button>
          </div>
        </nav>
        {/* schermi grandi */}
        <nav className="navbar  bg-scuro text-chiaro hidden lg:flex">
          <div className="flex justify-center items-center w-full">
            <a className="text-xl montserrat">
              <Jdeam />
            </a>
          </div>
        </nav>
        <nav className="navbar bg-scuro border-b border-scuro-2 text-chiaro hidden lg:flex">
          <ul className="flex justify-center gap-10 w-full">
            {links.map((link) => {
              return (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-2xl border-b-3 border-transparent hover:border-[#E74B32] hover:text-chiaro hover:font-bold hover:translate-y-[-2px] transition-all duration-300"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.href} className="text-2xl border-b-3 border-transparent hover:border-[#E74B32] hover:text-chiaro hover:font-bold hover:translate-y-[-2px] transition-all duration-300">
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
          <Link to="/profile" className="text-2xl border-b-3 border-transparent hover:border-[#E74B32] hover:text-chiaro hover:font-bold hover:translate-y-[-2px] absolute right-5 transition-all duration-300">
               <AvatarDisplay url={userData?.avatarUrl} size={40} className="w-10 h-10" />
          </Link>
        </nav>
        {/* barra di ricerca */}
        <nav className="flex justify-center bg-scuro items-center lg:w-3/4 mx-auto">
          <SearchBar />
        </nav>
      </div>
    </>
  );
};

export default Navbar; 