
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
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
        <div className="flex h-12 items-center justify-between">
          {/* Left empty space for symmetry */}
          <div className="flex items-center">
            {/* Menu button removed from here */}
          </div>
          
          {/* Right side - Search and profile */}
          <div className="flex items-center gap-3">
            {showSearch && (
              <Link
                to="/search"
                className={`flex h-8 w-8 items-center justify-center rounded-full ${transparent ? 'text-white' : 'text-gray-600'}`}
              >
                <Search className="h-5 w-5" />
              </Link>
            )}
            
            {showNotification && (
              <div className={`h-8 w-8 rounded-full bg-gray-200 ${transparent ? 'bg-white/20' : ''}`}>
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
