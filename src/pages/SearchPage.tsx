
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { Input } from '@/components/ui/input';
import { Search, Tag } from 'lucide-react';
import { NewsItem } from '@/components/NewsCard';
import { fetchNewsByHashtag } from '@/services/newsService';
import HashtagScrollbar from '@/components/HashtagScrollbar';
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hashtag = params.get('hashtag') || '';
    setSearchTerm(hashtag);

    if (hashtag) {
      handleSearch(hashtag);
      setHasSearched(true);
    }
  }, [location.search]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await fetchNewsByHashtag(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]); // Empty results instead of fallback data
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?hashtag=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Tìm kiếm" />

      <div className="container mx-auto px-4 pt-4">
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Tìm kiếm theo hashtag..."
              value={searchTerm}
              onChange={handleInputChange}
              className="pl-10 rounded-full py-2 px-4 border-gray-300 focus:ring-newsapp-teal focus:border-newsapp-teal shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="ml-3 rounded-full bg-newsapp-teal hover:bg-newsapp-teal-dark text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-newsapp-teal focus:ring-opacity-50 transition-colors"
            aria-label="Search"
            disabled={isLoading}
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {!hasSearched && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Hashtags phổ biến</h2>
            <HashtagScrollbar />
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-white rounded-lg">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          hasSearched && (
            searchResults.length > 0 ? (
              <div>
                <h2 className="text-lg font-semibold mb-3">Kết quả cho "{searchTerm}"</h2>
                <NewsList items={searchResults} variant="compact" />
              </div>
            ) : (
              <div className="text-center py-8">
                <Tag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-lg font-medium">Không tìm thấy kết quả cho "{searchTerm}"</p>
                <p className="text-gray-500 mt-2">Hãy thử tìm kiếm với từ khóa khác</p>
              </div>
            )
          )
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default SearchPage;
