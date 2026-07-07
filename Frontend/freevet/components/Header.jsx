import React from 'react';
import Button from './Button';


function Header() {
  const navItems = ['Symptoms', 'Diseases', 'Vet'];

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 rounded-2xl bg-neutral-900/40 border border-white/10 shadow-2xl">
    
      <div className="flex items-center justify-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105">
        
          <svg
            className="w-5 h-5 text-white" path=''
          />
        </div>

        <span className="font-bold text-lg tracking-wide text-white bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:to-neutral-400 transition-all duration-300">
          Freevet
        </span>
      </div>

      {/* Middle: Navigation Items */}
      <nav className="hidden md:flex items-center gap-1 bg-neutral-950/40 p-1.5 rounded-xl border border-white/5">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline">Login</Button>
        <Button variant="primary">Signup</Button>
      </div>
    </header>
  );
}

export default Header;
