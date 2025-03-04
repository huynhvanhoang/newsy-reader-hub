
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import TopSection from '@/components/TopSection';
import MainContent from '@/components/MainContent';
import useCurrentDate from '@/hooks/useCurrentDate';
import useNewsData from '@/hooks/useNewsData';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const currentDate = useCurrentDate();
  const { featuredNews, latestNews, trendingNews } = useNewsData(!showSplash);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <TopSection currentDate={currentDate} />
      <MainContent 
        featuredNews={featuredNews}
        latestNews={latestNews}
        trendingNews={trendingNews}
      />
      <Navbar />
    </div>
  );
};

export default Index;
