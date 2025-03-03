
import { useState, useEffect } from 'react';
import { Search, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotification?: boolean;
  transparent?: boolean;
}

const Header = ({ 
  title, 
  showSearch = true,
  showNotification = true,
  transparent = false
}: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  
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
  
  const getHeaderClasses = () => {
    if (transparent && !scrolled) {
      return 'bg-transparent';
    }
    return scrolled 
      ? 'bg-white/90 backdrop-blur-md shadow-sm' 
      : 'bg-white';
  };
  
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${getHeaderClasses()}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-newsapp-teal text-white font-bold rounded-lg p-2 flex items-center justify-center transform transition-transform hover:scale-105">
              <span className="text-xl">24h</span>
            </div>
            {!title && <span className="font-bold text-xl text-newsapp-text">Đọc báo 24h</span>}
          </Link>
          {title && <h1 className="text-lg font-semibold text-newsapp-text">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-4">
          {showSearch && (
            <Link
              to="/search"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <Search className="h-5 w-5" />
            </Link>
          )}
          
          {showNotification && (
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
              <BellRing className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-newsapp-teal"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
