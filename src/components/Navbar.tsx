
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Newspaper, Compass, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Xu hướng', path: '/trending', icon: <Compass className="h-5 w-5" /> },
    { name: 'Tiện ích', path: '/utilities', icon: <User className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile navbar */}
      <div className={`fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 bg-white z-50 md:hidden transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="flex h-full justify-around items-center px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-newsapp-teal'
                  : 'text-gray-500 hover:text-newsapp-teal'
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop navbar */}
      <div className={`hidden md:block fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="container mx-auto flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-newsapp-teal text-white font-bold rounded-lg p-2 flex items-center justify-center transform transition-transform hover:scale-105">
              <span className="text-xl">24h</span>
            </div>
            <span className="font-bold text-xl">Đọc báo 24h</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-newsapp-teal'
                    : 'text-gray-700 hover:text-newsapp-teal'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu button - positioned at left side of the header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-newsapp-teal text-white shadow-md md:hidden transform transition hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden animate-fade-in">
          <div className="flex h-full flex-col pt-16 pb-20 px-6">
            <div className="mt-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-newsapp-teal/10 text-newsapp-teal'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
