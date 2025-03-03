
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryItem } from '@/components/CategoryGrid';

interface HorizontalCategoriesProps {
  categories: CategoryItem[];
}

const HorizontalCategories = ({ categories }: HorizontalCategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount 
      : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      
      {/* Categories scroll container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-2 px-2 -mx-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="flex-shrink-0 px-4 py-2 mr-2 text-sm font-medium whitespace-nowrap transition-colors rounded-full hover:bg-newsapp-teal/10"
            style={{ 
              backgroundColor: category.id === '1' ? 'rgba(52, 197, 172, 0.1)' : 'transparent',
              color: category.id === '1' ? '#34C5AC' : 'inherit',
              borderBottom: category.id === '1' ? '2px solid #34C5AC' : 'none'
            }}
          >
            {category.name}
          </Link>
        ))}
      </div>
      
      {/* Right scroll button */}
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default HorizontalCategories;
