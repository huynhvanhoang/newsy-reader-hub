
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryItem } from '@/components/CategoryGrid';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalCategoriesProps {
  categories: CategoryItem[];
}

const HorizontalCategories = ({ categories }: HorizontalCategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory = currentPath.includes('category/') ? currentPath.split('/').pop() : '';

  // Check if scroll arrows should be shown
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  // Scroll to active category on mount
  useEffect(() => {
    const scrollToActive = () => {
      if (!scrollRef.current) return;
      
      const activeElement = scrollRef.current.querySelector('.active-category');
      if (activeElement) {
        const containerWidth = scrollRef.current.clientWidth;
        const activeElementLeft = (activeElement as HTMLElement).offsetLeft;
        const activeElementWidth = (activeElement as HTMLElement).offsetWidth;
        
        // Center the active element
        scrollRef.current.scrollTo({
          left: activeElementLeft - (containerWidth / 2) + (activeElementWidth / 2),
          behavior: 'smooth'
        });
      }
    };
    
    // Small delay to ensure elements are rendered
    setTimeout(scrollToActive, 100);
    
    // Initial check for scroll arrows
    setTimeout(checkScrollPosition, 150);
  }, [currentCategory]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-gray-700"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      
      {/* Categories scroll container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-1 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = category.slug === currentCategory || 
                          (category.slug === 'nong' && (!currentCategory || currentCategory === ''));
          
          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`flex-shrink-0 whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-white active-category border-b-2 border-white' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
      
      {/* Right scroll button */}
      {showRightArrow && (
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-gray-700"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default HorizontalCategories;
