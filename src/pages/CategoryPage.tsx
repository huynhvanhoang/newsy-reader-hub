import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import NewsCard from '@/components/NewsCard';
import { newsData } from '@/data/newsData';
import { categories } from '@/data/categoryData';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any | null>(null);
  const [filteredNews, setFilteredNews] = useState([]);
  
  useEffect(() => {
    const category = categories.find((c) => c.slug === slug);
    
    if (category) {
      setCategoryData(category);
      
      const categoryName = category.name;
      const newsForCategory = newsData.filter((item) => {
        return item.category.toLowerCase().includes(categoryName.toLowerCase()) ||
               categoryName.toLowerCase().includes(item.category.toLowerCase());
      });
      
      setFilteredNews(newsForCategory.length > 0 ? newsForCategory : newsData.slice(0, 5));
    } else {
      setCategoryData({
        name: 'Danh mục không tồn tại',
        image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      });
      setFilteredNews(newsData.slice(0, 3));
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [slug]);
  
  if (isLoading || !categoryData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-newsapp-background">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-newsapp-teal"></div>
          <p className="mt-4 text-newsapp-text">Đang tải...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header />
      
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <img
          src={categoryData.image}
          alt={categoryData.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{categoryData.name}</h1>
        </div>
        <Link
          to="/news"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      
      <main className="container mx-auto px-4 pt-6 animate-fade-in">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Tin {categoryData.name}</h2>
          </div>
          
          <div className="space-y-4">
            {filteredNews.length > 0 ? (
              <NewsList items={filteredNews} variant="default" columnLayout="single" />
            ) : (
              <div className="rounded-xl bg-white p-6 text-center">
                <p className="text-gray-500">Không có tin tức nào trong danh mục này</p>
              </div>
            )}
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Danh mục liên quan</h2>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories
              .filter((c) => c.slug !== slug)
              .slice(0, 4)
              .map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group relative aspect-video overflow-hidden rounded-xl"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-center text-sm font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
};

export default CategoryPage;
