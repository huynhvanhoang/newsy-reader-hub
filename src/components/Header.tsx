
import { useState, useEffect } from 'react';
import { Search, Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
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
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu button */}
          <div className="flex items-center">
            <button className={`flex h-10 w-10 items-center justify-center rounded-full ${transparent ? 'text-white' : 'text-gray-600'}`}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Right side - Search and profile */}
          <div className="flex items-center gap-3">
            {showSearch && (
              <Link
                to="/search"
                className={`flex h-10 w-10 items-center justify-center rounded-full ${transparent ? 'text-white' : 'text-gray-600'}`}
              >
                <Search className="h-6 w-6" />
              </Link>
            )}
            
            {showNotification && (
              <div className={`h-10 w-10 rounded-full bg-gray-200 ${transparent ? 'bg-white/20' : ''}`}>
                <img 
                  src="/lovable-uploads/60eb9a88-12fc-44e3-a5e5-bcf9bc48f819.png" 
                  alt="Profile" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
