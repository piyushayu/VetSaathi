import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { logoutUser } from '@/lib/auth';
import { getProfile } from '@/lib/database';
import AnimatedBtn1 from './mvpblocks/animated-btn1';
import { User, Menu, X, Info, Stethoscope, Activity, LogIn, UserPlus } from 'lucide-react';

function Header({ className = "" }) {
  const mergedClassName = className;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [ 
    { title: "About", href: "/about", icon: <Info className="w-4 h-4 text-emerald-400" /> },
    { title: "Diseases", href: "/diseases", icon: <Stethoscope className="w-4 h-4 text-teal-400" /> },
    { title: "Symptoms", href: "/symptoms", icon: <Activity className="w-4 h-4 text-cyan-400" /> }
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
      "w-full flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 rounded-2xl bg-neutral-900/40 border border-white/10 shadow-2xl relative z-50",
      mergedClassName
    )}>
      {/* Brand Logo */}
      <div className="flex-1 flex justify-start">
        <Link to="/" className="flex items-center group cursor-pointer decoration-transparent">
          <img 
            src="https://eczkxdnpwbohewsyikux.supabase.co/storage/v1/object/public/Images/ChatGPT%20Image%20Jul%2018,%202026,%2006_35_45%20PM.png"
            alt="VetSaathi Logo" 
            loading="lazy"
            className="w-12 sm:w-16 h-8 sm:h-10 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            onError={(e) => {
              // Fallback if token expires
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-bold text-base sm:text-lg tracking-wide text-neutral-250 hover:text-white transition-all duration-300 ml-1">
            VetSaathi
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10 bg-neutral-950/40 p-1.5 rounded-xl border border-white/5">
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

      {/* Right Side: Auth / Profile & Mobile Dropdown */}
      <div className="flex-1 flex justify-end" ref={dropdownRef}>
        {isloggedIn ? (
          /* LOGGED IN STATE */
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800/60 border border-white/10 flex items-center justify-center cursor-pointer focus:outline-none transition-all active:scale-95 overflow-hidden hover:border-emerald-500/50"
              aria-label="User Menu"
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-neutral-350" />
              )}
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 sm:w-48 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-50 py-2 flex flex-col text-left">
                {/* Mobile-Only Navigation Group inside Profile Dropdown */}
                <div className="md:hidden flex flex-col">
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Navigation
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2.5"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <hr className="border-neutral-800/80 my-1.5" />
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Account
                  </div>
                </div>

                <Link 
                  to="/profile" 
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
                >
                  Profile
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
                >
                  Contact Us
                </Link>
                <hr className="border-neutral-800 my-1.5"/>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-rose-400 hover:bg-neutral-800 hover:text-rose-300 text-left transition w-full cursor-pointer font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* LOGGED OUT STATE */
          <div>
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <AnimatedBtn1 text="Login" variant="transparent" />
              </Link>
              <Link to="/signup">
                <AnimatedBtn1 text="Signup" variant="solid" />
              </Link>
            </div>

            {/* Mobile Dropdown Icon Button */}
            <div className="relative md:hidden">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 rounded-xl bg-neutral-800/60 border border-neutral-700/80 text-neutral-200 hover:text-white hover:border-neutral-600 focus:outline-none transition-all active:scale-95"
                aria-label="Toggle Menu"
              >
                {dropdownOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-50 py-2.5 flex flex-col text-left">
                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Navigation
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2.5"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}

                  <hr className="border-neutral-800/80 my-2" />

                  <div className="px-4 py-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Account
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2.5"
                  >
                    <LogIn className="w-4 h-4 text-emerald-400" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 text-sm text-emerald-400 font-semibold hover:bg-neutral-800 hover:text-emerald-300 transition flex items-center gap-2.5"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-400" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;