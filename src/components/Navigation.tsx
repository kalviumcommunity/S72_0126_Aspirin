import { Link, useLocation } from 'react-router-dom';
import { Home, Train, MessageSquare, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { authService } from '@/services/authService';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/status', label: 'Live Status', icon: Train },
  { path: '/reports', label: 'Community Reports', icon: MessageSquare },
];

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-card rounded-xl p-1.5 shadow-card">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {isAuthenticated && user && (
          <>
            <span className="text-sm text-gray-600 mx-2">|</span>
            <span className="text-sm font-medium mx-2">Hi, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="nav-link ml-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link
            to="/auth"
            className={`nav-link ml-2 ${location.pathname === '/auth' ? 'nav-link-active' : ''}`}
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg bg-card shadow-card flex items-center justify-center"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-card rounded-xl shadow-card-hover p-2 z-50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated && user && (
              <>
                <div className="my-2 border-t"></div>
                <p className="text-sm font-medium p-2">Hi, {user.name}!</p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="nav-link w-full text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <div className="my-2 border-t"></div>
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className={`nav-link ${location.pathname === '/auth' ? 'nav-link-active' : ''}`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
