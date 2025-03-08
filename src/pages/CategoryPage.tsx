
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/components/NewsCard';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { transformArticleToNewsItem, formatTimestamp } from '@/services/newsService';

interface CategoryData {
  id: number;
  name: string;
  slug?: string;
  image?: string;
}

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<CategoryData[]>([]);
  
  useEffect(() => {
    async function fetchCategoryData() {
      setIsLoading(true);
      
      try {
        // Fetch the current category
        const { data: categoriesData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name')
          // Since we don't have slug in the table, we'll compare name
          .ilike('name', `%${slug?.replace(/-/g, ' ')}%`)
          .limit(1);
        
        if (categoryError || !categoriesData || categoriesData.length === 0) {
          console.error('Error fetching category:', categoryError);
          setCategoryData({
            id: 0,
            name: 'Danh mục không tồn tại',
            image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          });
          setFilteredNews([]);
          setIsLoading(false);
          return;
        }
        
        const category = {
          ...categoriesData[0],
          slug: categoriesData[0].name.toLowerCase().replace(/\s+/g, '-')
        };
        setCategoryData(category);
        
        // Fetch articles for this category
        const { data: articlesData, error: articlesError } = await supabase
          .from('news_articles')
          .select(`
            id,
            title,
            summary,
            image_url,
            slug,
            publish_date,
            category_id,
            categories(name)
          `)
          .eq('category_id', category.id)
          .order('publish_date', { ascending: false });
        
        if (articlesError) {
          console.error('Error fetching articles:', articlesError);
          setFilteredNews([]);
        } else {
          // Transform articles to match NewsItem interface
          const transformedArticles: NewsItem[] = articlesData.map(article => ({
            ...transformArticleToNewsItem(article),
            published_at: article.publish_date
          }));
          
          setFilteredNews(transformedArticles);
        }
        
        // Fetch related categories
        const { data: relatedCatsData, error: relatedCatsError } = await supabase
          .from('categories')
          .select('id, name')
          .neq('id', category.id)
          .limit(4);
        
        if (relatedCatsError) {
          console.error('Error fetching related categories:', relatedCatsError);
          setRelatedCategories([]);
        } else {
          // Transform categories to include slug
          const transformedCategories = relatedCatsData.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
            image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          }));
          setRelatedCategories(transformedCategories);
        }
      } catch (error) {
        console.error('Error in category page:', error);
      } finally {
        // Short delay to show loading effect
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
    
    fetchCategoryData();
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
          src={categoryData.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
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
            {relatedCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative aspect-video overflow-hidden rounded-xl"
              >
                <img
                  src={category.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
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
