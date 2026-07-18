import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { logoutUser } from '@/lib/auth';

function Header({
  className = ""
}) {
  const mergedClassName = className;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [ 
    {
      title : "About",
      href : "/about"
    },
    {
      title : "Diseases",
      href : "/diseases"
    },
    {
      title : "Symptoms",
      href : "/symptoms"
    }
  ];

  const isloggedIn = useSelector((state) => state.auth.status);
// second tough code for me to understand
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    const { error } = await logoutUser();
    if (!error) {
      navigate("/");
    }
  };
//
  return (
    <header className={cn(
      "w-full flex items-center justify-between px-8 py-4 rounded-2xl bg-neutral-900/40 border border-white/10 shadow-2xl relative",
      mergedClassName
    )} >
    
      <Link to="/" className="flex items-center justify-center gap-3 group cursor-pointer decoration-transparent">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105">
          <svg className="w-5 h-5 text-white" />
        </div>

        <span className="font-bold text-lg tracking-wide text-white bg-clip-text hover:text-transparent hover:bg-linear-to-r hover:from-white hover:to-neutral-400 transition-all duration-300">
          Freevet
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 bg-neutral-950/40 p-1.5 rounded-xl border border-white/5">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {isloggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/55 transition-all active:scale-95"
            aria-label="User Menu"
          >
            <span className="text-white text-xs font-bold">P</span>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl z-50 py-1.5 flex flex-col">
              <Link 
                to="/profile" 
                onClick={() => setDropdownOpen(false)}
                className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-left"
              >
                Profile
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setDropdownOpen(false)}
                className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition text-left"
              >
                Contact
              </Link>
              <hr className="border-neutral-800 my-1"/>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-400 hover:bg-neutral-850 hover:text-red-300 text-left transition w-full cursor-pointer font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="outline" className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30">Login</Button></Link>
          <Link to="/signup"><Button variant="primary" className="bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30">Signup</Button></Link>
        </div>
      )}
    </header>
  );
}

export default Header;
