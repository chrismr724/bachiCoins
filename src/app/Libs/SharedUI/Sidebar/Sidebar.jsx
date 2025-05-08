'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { TiArrowBack } from "react-icons/ti";


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: FaHome, href: `/dashboard/${user?.name}` },
    { label: 'BachiCoins', icon: TiArrowBack, href: `/` }
  ];

  return (
    <aside
      className={`${isCollapsed ? 'w-16' : 'w-56'} h-screen bg-white dark:bg-gray-900 sticky left-0 top-0 transition-all duration-300 ease-in-out border-r border-gray-100 dark:border-gray-800 z-50`}
    >
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 dark:border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-300 text-sm font-medium">{user?.name?.[0]?.toUpperCase()}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
              {user?.name}
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
        >
          {isCollapsed ? <FaBars className="text-gray-400 text-sm" /> : <FaTimes className="text-gray-400 text-sm" />}
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'} px-3 py-2 rounded-md text-sm transition-colors duration-150 ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
              <item.icon className={`text-base ${isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-400 dark:text-gray-500'}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;