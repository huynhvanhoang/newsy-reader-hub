
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

interface HorizontalCategoriesProps {
  categories?: CategoryItem[];
}

const HorizontalCategories = ({ categories: propCategories }: HorizontalCategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory = currentPath.includes('category/') ? currentPath.split('/').pop() : '';
  const [categories, setCategories] = useState<CategoryItem[]>(propCategories || []);
  const [loading, setLoading] = useState(!propCategories);

  useEffect(() => {
    if (!propCategories) {
      async function fetchCategories() {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('id, name, slug, icon, color');
          
          if (error) {
            console.error('Error fetching categories:', error);
            return;
          }
          
          setCategories(data || []);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchCategories();
    }
  }, [propCategories]);

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
  }, [currentCategory, categories]);

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

  if (loading) {
    return (
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide py-1 px-2">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 text-sm font-medium bg-white/20 animate-pulse h-6 w-20 mr-2 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

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
        className="flex overflow-x-auto scrollbar-hide py-1 px-2 ml-8"
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
