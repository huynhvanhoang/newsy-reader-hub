
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Bookmark, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { newsData, analyticNews } from '@/data/newsData';
import { cn } from '@/lib/utils';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Simulate fetching article data
    setIsLoading(true);
    const foundArticle = newsData.find(item => item.id === id);
    
    // Simulate loading time
    setTimeout(() => {
      setArticle(foundArticle || null);
      setIsLoading(false);
    }, 500);
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsapp-background">
        <Header title="Đang tải..." transparent />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded-md bg-gray-200"></div>
            <div className="h-64 rounded-xl bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-200"></div>
              <div className="h-4 rounded bg-gray-200"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen bg-newsapp-background">
        <Header title="Không tìm thấy" transparent />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Bài viết không tồn tại</h1>
          <p className="mb-8 text-gray-600">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link 
            to="/" 
            className="inline-flex items-center rounded-lg bg-newsapp-teal px-4 py-2 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Trở về trang chủ
          </Link>
        </div>
        <Navbar />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-newsapp-background">
      <Header transparent />
      
      <main className="container mx-auto px-4 pb-20 pt-4">
        {/* Back button */}
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-newsapp-teal">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Trở về
          </Link>
        </div>
        
        {/* Article header */}
        <article className="animate-fade-in rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-block rounded-md bg-newsapp-teal/10 px-2 py-1 text-xs font-medium text-newsapp-teal">
              {article.category}
            </span>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{article.timestamp}</span>
            </div>
          </div>
          
          <h1 className="mb-4 text-balance text-2xl font-bold leading-tight">
            {article.title}
          </h1>
          
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Nguồn: {article.source}
            </span>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  isLiked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
                )}
              >
                <Heart className="h-4 w-4" />
              </button>
              
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  isBookmarked ? "bg-blue-100 text-blue-500" : "bg-gray-100 text-gray-500"
                )}
              >
                <Bookmark className="h-4 w-4" />
              </button>
              
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-6 overflow-hidden rounded-lg">
            <img 
              src={article.image} 
              alt={article.title}
              className="h-auto w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          
          {/* Article content */}
          <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-p:text-gray-700">
            <p className="mb-4 text-lg font-medium text-gray-800">
              {article.summary || "Nội dung chi tiết của bài viết sẽ được hiển thị ở đây. Đang trong quá trình phát triển..."}
            </p>
            
            <p>
              Theo đó, quyết định số 01/QĐ-BNN-TCCB ngày 16/1/2024 của bộ Nông nghiệp và Phát triển nông thôn (PTNT) phê duyệt quy hoạch các chức danh lãnh đạo cấp phòng thuộc Cục Chăn nuôi chỉ rõ: Bà Nguyễn Thị Thúy Hiền, phó trưởng phòng Thanh tra - Pháp chế, được quy hoạch ở 2 vị trí là trưởng phòng Thanh tra - Pháp chế và trưởng phòng Kế hoạch - Tài chính.
            </p>
            
            <p>
              Quy hoạch này là giai đoạn 2021-2026, định hướng đến năm 2031. Đây là cán bộ nữ duy nhất được quy hoạch 2 vị trí trong số 29 vị trí quy hoạch cán bộ của Cục Chăn nuôi.
            </p>
            
            <p>
              Đáng chú ý, quyết định số 01 cũng quy hoạch ông Nguyễn Xuân Dương, cục trưởng Cục Chăn nuôi, vào vị trí trưởng phòng Tổ chức cán bộ; quy hoạch ông Nguyễn Văn Trọng, phó cục trưởng, vào vị trí trưởng phòng Kế hoạch - Tài chính.
            </p>
          </div>
        </article>
        
        {/* Related articles */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Tin liên quan</h2>
          <NewsList 
            items={analyticNews.filter(item => item.id !== id).slice(0, 3)} 
            variant="default" 
            columnLayout="single"
          />
        </section>
      </main>
      
      <Navbar />
    </div>
  );
};

export default ArticlePage;
