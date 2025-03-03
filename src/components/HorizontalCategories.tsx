
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategoryItem } from '@/components/CategoryGrid';

interface HorizontalCategoriesProps {
  categories: CategoryItem[];
}

const HorizontalCategories = ({ categories }: HorizontalCategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory = currentPath.includes('category/') ? currentPath.split('/').pop() : '';

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
  }, [currentCategory]);

  return (
    <div className="relative">
      {/* Categories scroll container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = category.slug === currentCategory || 
                          (category.slug === 'nong' && (!currentCategory || currentCategory === ''));
          
          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-base font-medium transition-colors ${
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
    </div>
  );
};

export default HorizontalCategories;
