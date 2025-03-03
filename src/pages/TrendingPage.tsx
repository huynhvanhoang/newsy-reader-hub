
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { trendingNews, hotNews, analyticNews } from '@/data/newsData';

const TrendingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsapp-background">
        <Header title="Xu hướng" />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
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
        </div>
        <Navbar />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Xu hướng" />
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        {/* Most trending */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Đang được quan tâm</h2>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <NewsList items={trendingNews} variant="compact" />
          </div>
        </section>
        
        {/* Hot news */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Nóng 24h</h2>
          </div>
          <NewsList 
            items={hotNews} 
            variant="default" 
            columnLayout="double"
          />
        </section>
        
        {/* Analysis */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Phân tích chuyên sâu</h2>
          </div>
          <NewsList 
            items={analyticNews} 
            variant="default" 
            columnLayout="single"
          />
        </section>
      </main>
      
      <Navbar />
    </div>
  );
};

export default TrendingPage;
