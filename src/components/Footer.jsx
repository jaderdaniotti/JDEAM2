import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-100 border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 justify-center md:justify-start">
          <Link to="/privacy" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 font-medium">
            Privacy
          </Link>
          <Link to="/terms" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 font-medium">
            Termini
          </Link>
        </nav>
        
        {/* Social Links */}
        <nav className="flex gap-6 justify-center">
          <a 
            href="#" 
            aria-label="Instagram" 
            className="text-2xl text-neutral-400 hover:text-primary-400 transition-all duration-200 hover:scale-110"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a 
            href="#" 
            aria-label="LinkedIn" 
            className="text-2xl text-neutral-400 hover:text-primary-400 transition-all duration-200 hover:scale-110"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a 
            href="#" 
            aria-label="GitHub" 
            className="text-2xl text-neutral-400 hover:text-primary-400 transition-all duration-200 hover:scale-110"
          >
            <i className="bi bi-github"></i>
          </a>
        </nav>
        
        {/* Copyright */}
        <aside className="text-center md:text-right">
          <p className="text-neutral-400 font-medium">
            &copy; {new Date().getFullYear()} JDeam2
          </p>
        </aside>
      </div>
    </div>
  </footer>
);

export default Footer; 