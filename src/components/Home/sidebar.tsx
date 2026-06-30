import {
  LayoutDashboardIcon,
  UserIcon,
  CalendarDaysIcon,
  Wand2Icon,
  LogOutIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();

  // Temporary user data
  const { logout, user } = {
    logout: () => {
      window.location.href = "/";
    },
    user: {
      name: "Mrinmoy",
      email: "mrinmoydhali24@gmail.com",
    },
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
    },
    {
      name: "Accounts",
      icon: UserIcon,
      path: "/accounts",
    },
    {
      name: "Schedule",
      icon: CalendarDaysIcon,
      path: "/schedule",
    },
    {
      name: "AI Composer",
      icon: Wand2Icon,
      path: "/aicomposer",
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-800">
          <img src="/logo.png" alt="logo" className="size-6" />
          <span>Socially</span>
        </div>
      </div>

      {/* Menu Title */}
      <div className="px-6 py-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {/* Blue active/hover bar */}
              <span
                className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-500 transition-all duration-200 ${
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <Icon className="size-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">
              {user.email}
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;