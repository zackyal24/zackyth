import React from 'react';
import { Home, User, Folder, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ activeSection, onNavigate }) {
  const location = useLocation();

  const navItems = [
    { id: 'hero', name: 'Home', path: '/', icon: Home },
    { id: 'about', name: 'About', path: '/about', icon: User },
    { id: 'projects', name: 'My Projects', path: '/projects', icon: Folder },
    { id: 'contact', name: 'Contact', path: '/#contact', icon: Mail },
  ];

  const handleNavClick = (e, item) => {
    if (location.pathname === '/' && onNavigate) {
      e.preventDefault();
      onNavigate(item.id);
      return;
    }
    if (item.path.startsWith('/#')) {
      const elementId = item.path.split('#')[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Only show on homepage
  if (location.pathname !== '/') return null;

  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
      <div className="bg-[#1e2330] text-white py-5 px-2.5 rounded-r-2xl shadow-xl flex flex-col gap-7 items-center border-r border-y border-zinc-700/40 backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isRouteActive = location.pathname === item.path;
          
          // Fix active state logic
          let isActive = false;
          if (location.pathname === '/') {
            // On home page, rely purely on scroll spy (activeSection)
            isActive = activeSection === item.id;
          } else {
            // On subpages, match route or activeSection
            isActive = isRouteActive || activeSection === item.id;
          }

          return (
            <div key={item.id} className="relative group">
              {item.path.startsWith('/#') ? (
                <a
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-md scale-110'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-md scale-110'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )}

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

