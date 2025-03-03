
import { useState } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { newsData } from '@/data/newsData';
import { categories } from '@/data/categoryData';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredNews = selectedCategory 
    ? newsData.filter(item => item.category === selectedCategory)
    : newsData;
    
  const categoryNames = [...new Set(categories.map(c => c.name))];
  
  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Tin tức" />
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        {/* Category Filter */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-newsapp-teal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            
            {categoryNames.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-newsapp-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        
        {/* News List */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">
            {selectedCategory ? `Tin ${selectedCategory}` : 'Tất cả tin tức'}
          </h2>
          
          <div className="space-y-4">
            {filteredNews.map((item, index) => (
              <div 
                key={item.id} 
                className="animate-fade-up rounded-lg bg-white p-3 shadow-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
};

// This is needed because we're dynamically importing the NewsCard component inside NewsPage
const NewsCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="flex gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <h3 className="text-balance mb-2 text-base font-semibold leading-tight sm:text-lg">
          {item.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-newsapp-teal">
              {item.source}
            </span>
            <span className="text-xs text-gray-500">
              {item.timestamp}
            </span>
          </div>
          
          <span className="rounded-md bg-newsapp-teal/10 px-2 py-1 text-xs font-medium text-newsapp-teal">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
