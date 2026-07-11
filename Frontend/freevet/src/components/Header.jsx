import React from 'react';
import Button from './Button';
import {Link} from "react-router-dom"

import { cn } from "@/lib/utils";

function Header({
  className = ""
}) {
  const mergedClassName = className;
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

  return (
    <header className={cn(
      "w-full flex items-center justify-between px-8 py-4 rounded-2xl bg-neutral-900/40 border border-white/10 shadow-2xl",
      mergedClassName
    )} >
    
      <Link to="/" className="flex items-center justify-center gap-3 group cursor-pointer decoration-transparent">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105">
        
          <svg
            className="w-5 h-5 text-white" path=''
          />
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

      <div className="flex items-center gap-3">
        <Link to="/login"><Button variant="outline">Login</Button></Link>
        <Link to="/signup"><Button variant="primary">Signup</Button></Link>
      </div>
    </header>
  );
}

export default Header;
