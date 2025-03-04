
import FeaturedNews from '@/components/FeaturedNews';
import HashtagScrollbar from '@/components/HashtagScrollbar';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/components/NewsCard';

interface MainContentProps {
  featuredNews: NewsItem[];
  latestNews: NewsItem[];
  trendingNews: NewsItem[];
}

const MainContent = ({ featuredNews, latestNews, trendingNews }: MainContentProps) => {
  return (
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
  );
};

export default MainContent;
