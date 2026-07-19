import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { logoutUser } from '@/lib/auth';
import { getProfile } from '@/lib/database';
import AnimatedBtn1 from './mvpblocks/animated-btn1';
import { User } from 'lucide-react';

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
  const userId = useSelector((state) => state.auth.userData?.id);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }
    async function fetchProfile() {
      const { data } = await getProfile(userId);
      if (data) setProfile(data);
    }
    fetchProfile();

    window.addEventListener('profile-updated', fetchProfile);
    return () => {
      window.removeEventListener('profile-updated', fetchProfile);
    };
  }, [userId]);
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
    
      <div className="flex-1 flex justify-start">
        <Link to="/" className="flex items-center justify-center  group cursor-pointer decoration-transparent">
          <img 
            src="https://eczkxdnpwbohewsyikux.supabase.co/storage/v1/object/sign/Images/ChatGPT%20Image%20Jul%2018,%202026,%2006_35_45%20PM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81YjIyZDEwYS03NDI0LTRiZWQtYTBkOS1hNzkxMDE2YWQwNTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvQ2hhdEdQVCBJbWFnZSBKdWwgMTgsIDIwMjYsIDA2XzM1XzQ1IFBNLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQ0NDAyNDYsImV4cCI6MTgxNTk3NjI0Nn0.BAtLvvUrxWXVAu5HspWg7QTOqQjytkkMZLBM-bEla6Q" 
            alt="Freevet Logo" 
            className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
          <span className="font-bold text-lg tracking-wide text-neutral-250 bg-clip-text hover:text-white transition-all duration-300">
            Freevet
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-10 bg-neutral-950/40 p-1.5 rounded-xl border border-white/5">
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

      <div className="flex-1 flex justify-end">
        {isloggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full bg-neutral-800/40 border border-white/10 flex items-center justify-center cursor-pointer focus:outline-none transition-all active:scale-95 overflow-hidden"
              aria-label="User Menu"
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-neutral-350" />
              )}
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
          <Link to="/login">
            <AnimatedBtn1 text="Login" variant="transparent" />
          </Link>
          <Link to="/signup">
            <AnimatedBtn1 text="Signup" variant="solid" />
          </Link>
        </div>
        )}
      </div>
    </header>
  );
}

export default Header;
{/* <Button variant="outline" className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30">Login</Button> */}