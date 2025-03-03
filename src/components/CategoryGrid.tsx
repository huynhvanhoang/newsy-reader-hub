
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };
  
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className="group relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gray-200">
            {!loadedImages[category.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <span className="sr-only">Loading</span>
              </div>
            )}
            <img
              src={category.image}
              alt={category.name}
              onLoad={() => handleImageLoad(category.id)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${
                loadedImages[category.id] ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 transition-opacity group-hover:opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-center text-xl font-bold text-white transition-transform group-hover:scale-110">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
