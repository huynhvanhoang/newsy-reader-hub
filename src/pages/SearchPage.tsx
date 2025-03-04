import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { Input } from '@/components/ui/input';
import { Search, Tag } from 'lucide-react'; // Changed Hashtag to Tag
import { NewsItem } from '@/components/NewsCard';
import { fetchNewsByHashtag } from '@/services/newsService';
import { newsData } from '@/data/newsData';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hashtag = params.get('hashtag') || '';
    setSearchTerm(hashtag);

    if (hashtag) {
      handleSearch(hashtag);
    }
  }, [location.search]);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const results = await fetchNewsByHashtag(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults(newsData); // Fallback data
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?hashtag=${searchTerm}`);
  };

  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Tìm kiếm" />

      <div className="container mx-auto px-4 pt-4">
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Tìm kiếm theo hashtag..."
            value={searchTerm}
            onChange={handleInputChange}
            className="rounded-full py-2 px-4 border-gray-300 focus:ring-newsapp-teal focus:border-newsapp-teal shadow-sm"
          />
          <button
            type="submit"
            className="ml-3 rounded-full bg-newsapp-teal hover:bg-newsapp-teal-dark text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-newsapp-teal focus:ring-opacity-50 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {isLoading ? (
          <div className="text-center">Đang tìm kiếm...</div>
        ) : (
          searchResults.length > 0 ? (
            <NewsList items={searchResults} variant="default" />
          ) : (
            searchTerm && <div className="text-center">Không tìm thấy kết quả cho "{searchTerm}"</div>
          )
        )}
      </div>

      <Navbar />
    </div>
  );
};

export default SearchPage;
