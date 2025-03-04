
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import FeaturedNews from '@/components/FeaturedNews';
import HorizontalCategories from '@/components/HorizontalCategories';
import NewsList from '@/components/NewsList';
import HashtagScrollbar from '@/components/HashtagScrollbar';
import { Calendar } from 'lucide-react';
import { NewsItem } from '@/components/NewsCard';
import { 
  fetchFeaturedNews,
  fetchLatestNews,
  fetchTrendingNews
} from '@/services/newsService';
import { newsData, trendingNews as staticTrendingNews } from '@/data/newsData';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Get current date in Vietnamese format
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    setCurrentDate(`${day === 'Chủ nhật' ? day : `Thứ ${day.split(' ')[1]}`}, ${date} tháng ${month}, ${year}`);

    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowSplash(false);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        // Load data from Supabase
        const featured = await fetchFeaturedNews();
        const latest = await fetchLatestNews(6);
        const trending = await fetchTrendingNews(5);
        
        setFeaturedNews(featured);
        setLatestNews(latest);
        setTrendingNews(trending);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        // Fallback to static data if needed
        if (featuredNews.length === 0) setFeaturedNews(newsData.slice(0, 5));
        if (latestNews.length === 0) setLatestNews(newsData.slice(0, 6));
        if (trendingNews.length === 0) setTrendingNews(staticTrendingNews);
      }
    }

    if (!showSplash) {
      loadData();
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-newsapp-teal-light to-white">
        <div className="splash-logo text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-newsapp-teal p-4 shadow-lg">
            <span className="text-4xl font-bold text-white">24h</span>
          </div>
          <h1 className="text-2xl font-bold text-newsapp-teal">Đọc báo 24h</h1>
          {isLoading && (
            <div className="mt-8">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
                <div className="animate-pulse h-full w-full bg-newsapp-teal"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <div className="bg-gradient-to-r from-newsapp-teal to-blue-500 pb-2">
        <Header transparent={true} />
        
        <div className="container mx-auto px-4 mt-2">
          <HorizontalCategories />
        </div>
        
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        <HashtagScrollbar />
        
        <section className="mb-8">
          <FeaturedNews items={featuredNews} />
        </section>
        
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Tin mới nhất</h2>
            <a href="/category/moi" className="text-sm font-medium text-newsapp-teal">
              Xem tất cả
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item, index) => (
              <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <NewsList items={[item]} variant="default" />
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Đang được quan tâm</h2>
            <a href="/trending" className="text-sm font-medium text-newsapp-teal">
              Xem thêm
            </a>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <NewsList items={trendingNews} variant="compact" />
          </div>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Index;
