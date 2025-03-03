
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import FeaturedNews from '@/components/FeaturedNews';
import HorizontalCategories from '@/components/HorizontalCategories';
import NewsList from '@/components/NewsList';
import NewsCard from '@/components/NewsCard';
import { newsData, trendingNews } from '@/data/newsData';
import { categories } from '@/data/categoryData';
import { Calendar } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get current date in Vietnamese format
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    setCurrentDate(`T${day === 'Chủ nhật' ? '7' : day.split(' ')[1]}, ${date} tháng ${month}, ${year}`);

    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowSplash(false);
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
        
        <div className="container mx-auto px-4 mt-8">
          <HorizontalCategories categories={categories} />
        </div>
        
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 py-1">
            {['# Mỹ - Trung', '# AI - Trí tuệ nhân tạo', '# Lễ hội xuân 2025', '# Kinh tế', '# Thể thao', '# Giải trí', '# Du lịch'].map((topic, index) => (
              <div key={index} className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm">
                {topic}
              </div>
            ))}
          </div>
        </div>
        
        <section className="mb-8">
          <FeaturedNews items={newsData.slice(0, 5)} />
        </section>
        
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Tin mới nhất</h2>
            <a href="/news" className="text-sm font-medium text-newsapp-teal">
              Xem tất cả
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsData.slice(0, 6).map((item) => (
              <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${parseInt(item.id) * 0.1}s` }}>
                <NewsCard item={item} />
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
