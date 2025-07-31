import React from "react";
import { Link } from "react-router-dom";
const Footer = () => (
  <footer className="footer footer-center p-6 flex items-center justify-between bg-scuro text-chiaro border-t-1 border-chiaro-2">
    <nav className=" flex gap-4">
      <Link to="/privacy" className="link link-hover">Privacy</Link>
      <Link to="/terms" className="link link-hover">Termini</Link>
    </nav>
    <nav className=" flex gap-4">
      <a href="#" aria-label="Instagram" className="text-xl hover:text-primary transition"><i className="bi bi-instagram"></i></a>
      <a href="#" aria-label="LinkedIn" className="text-xl hover:text-primary transition"><i className="bi bi-linkedin"></i></a>
      <a href="#" aria-label="GitHub" className="text-xl hover:text-primary transition"><i className="bi bi-github"></i></a>
    </nav>
    <aside>
      <p>&copy; {new Date().getFullYear()} JDeam2</p>
    </aside>
  </footer>
);

export default Footer; 