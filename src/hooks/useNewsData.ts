
import { useState, useEffect } from 'react';
import { NewsItem } from '@/components/NewsCard';
import { 
  fetchFeaturedNews,
  fetchLatestNews,
  fetchTrendingNews
} from '@/services/newsService';
import { newsData, trendingNews as staticTrendingNews } from '@/data/newsData';

const useNewsData = (isLoading: boolean) => {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);

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

    if (!isLoading) {
      loadData();
    }
  }, [isLoading, featuredNews.length, latestNews.length, trendingNews.length]);

  return { featuredNews, latestNews, trendingNews };
};

export default useNewsData;
