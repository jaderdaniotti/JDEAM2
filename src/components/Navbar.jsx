import React from "react";
import Jdeam from "./logo/Jdeam";

const Navbar = () => (
  <>
  <div className="navbar border-b-1 border-scuro-2 bg-scuro text-chiaro ">
    <div className="navbar-start">
      <div className="dropdown">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className=" drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-chiaro text-scuro min-h-full w-80 p-4">
              <li><a href="/">Home</a></li>
              <li><a href="/games">Giochi</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Termini</a></li>
              <li><a href="/contact">Contatti</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="navbar-center">
      <a className="text-xl montserrat">
        <Jdeam />
      </a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
      </button>
      <button className="btn btn-ghost btn-circle" onClick={() => window.location.href = '/profile'}>
      <i className="bi text-lg bi-person-circle"></i>
      </button>
    </div>
  </div>
  </>
);

export default Navbar; 