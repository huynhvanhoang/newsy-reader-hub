
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/components/NewsCard';
import { newsData, trendingNews } from '@/data/newsData';
import { categories } from '@/data/categoryData';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  
  // Handle search
  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchParams({ q: query });
    
    // Simulate search with delay
    setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      const lowercaseQuery = query.toLowerCase();
      
      // Filter news by title, category, or source
      let filteredResults = newsData.filter(item => 
        item.title.toLowerCase().includes(lowercaseQuery) || 
        item.category.toLowerCase().includes(lowercaseQuery) || 
        item.source.toLowerCase().includes(lowercaseQuery)
      );
      
      // Apply category filter if selected
      if (selectedCategory) {
        filteredResults = filteredResults.filter(item => 
          item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      
      setResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };
  
  // Search on mount if query exists
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, []);
  
  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  };
  
  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Tìm kiếm" showSearch={false} />
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        {/* Search form */}
        <div className="mb-6 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tin tức..."
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 pr-10 text-sm text-gray-900 focus:border-newsapp-teal focus:ring-newsapp-teal"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(searchTerm);
                }
              }}
            />
            
            {searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-12 flex items-center pr-3"
                onClick={() => {
                  setSearchTerm('');
                  setResults([]);
                  setSearchParams({});
                }}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
            
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className={`h-5 w-5 ${selectedCategory ? 'text-newsapp-teal' : 'text-gray-500'}`} />
            </button>
          </div>
          
          {/* Filter options */}
          {showFilter && (
            <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-medium">Lọc theo chuyên mục:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedCategory === null 
                      ? 'bg-newsapp-teal text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(null)}
                >
                  Tất cả
                </button>
                
                {categories.slice(0, 8).map((category) => (
                  <button
                    key={category.id}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedCategory === category.name 
                        ? 'bg-newsapp-teal text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Search results */}
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded bg-gray-200"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                    <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {searchTerm && (
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  {results.length > 0 
                    ? `Kết quả cho "${searchTerm}" (${results.length})` 
                    : `Không tìm thấy kết quả cho "${searchTerm}"`}
                </h2>
              </div>
            )}
            
            {results.length > 0 ? (
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <NewsList items={results} variant="compact" />
              </div>
            ) : (
              !isLoading && searchTerm && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Không tìm thấy kết quả</h3>
                  <p className="text-sm text-gray-600">
                    Hãy thử tìm kiếm với từ khóa khác hoặc xem các xu hướng bên dưới
                  </p>
                </div>
              )
            )}
            
            {!searchTerm && (
              <>
                <h2 className="mb-4 text-xl font-bold">Xu hướng tìm kiếm</h2>
                <div className="mb-6 flex flex-wrap gap-2">
                  {['COVID-19', 'Ukraine', 'Giá vàng', 'Giá xăng', 'Thời tiết', 'Bóng đá', 'Chứng khoán'].map((trend) => (
                    <button
                      key={trend}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                      onClick={() => {
                        setSearchTerm(trend);
                        handleSearch(trend);
                      }}
                    >
                      # {trend}
                    </button>
                  ))}
                </div>
                
                <h2 className="mb-4 text-xl font-bold">Được tìm kiếm nhiều</h2>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <NewsList items={trendingNews} variant="compact" />
                </div>
              </>
            )}
          </>
        )}
      </main>
      
      <Navbar />
    </div>
  );
};

export default SearchPage;
