
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/components/NewsCard';
import { Hashtag } from 'lucide-react';
import { fetchNewsByHashtag } from '@/services/newsService';
import { supabase } from '@/integrations/supabase/client';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const hashtag = searchParams.get('hashtag') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<NewsItem[]>([]);
  const [hashtagInfo, setHashtagInfo] = useState<{name: string, count: number} | null>(null);
  
  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      
      try {
        if (hashtag) {
          // Search by hashtag
          const hashtagResults = await fetchNewsByHashtag(hashtag);
          setResults(hashtagResults);
          
          // Get hashtag info
          const { data: hashtagData } = await supabase
            .from('hashtags')
            .select('name')
            .eq('slug', hashtag)
            .single();
            
          if (hashtagData) {
            setHashtagInfo({
              name: hashtagData.name,
              count: hashtagResults.length
            });
          }
        } else if (query) {
          // Search by query (title or content)
          const { data, error } = await supabase
            .from('articles')
            .select(`
              id,
              title,
              summary,
              image_url,
              slug,
              published_at,
              views,
              category_id,
              categories(name)
            `)
            .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
            .order('published_at', { ascending: false });
            
          if (error) {
            console.error('Error searching articles:', error);
            setResults([]);
          } else {
            // Transform to NewsItem format
            const transformedResults: NewsItem[] = data.map(article => ({
              id: article.id.toString(),
              title: article.title,
              summary: article.summary || '',
              image: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              category: article.categories?.name || 'Tin tức',
              source: 'Báo 24h',
              timestamp: formatTimestamp(article.published_at),
              slug: article.slug,
              published_at: article.published_at
            }));
            
            setResults(transformedResults);
          }
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchResults();
  }, [query, hashtag]);
  
  // Helper function to format timestamp
  const formatTimestamp = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ngày trước`;
    }
  };
  
  let pageTitle = 'Tìm kiếm';
  let searchDescription = '';
  
  if (hashtag && hashtagInfo) {
    pageTitle = `#${hashtagInfo.name}`;
    searchDescription = `${hashtagInfo.count} bài viết`;
  } else if (query) {
    pageTitle = 'Kết quả tìm kiếm';
    searchDescription = `"${query}" (${results.length} kết quả)`;
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsapp-background">
        <Header title={pageTitle} />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="h-4 w-3/4 rounded bg-gray-200 mb-2"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
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
      <Header title={pageTitle} />
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        {hashtag && hashtagInfo && (
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-newsapp-teal/10">
              <Hashtag className="h-5 w-5 text-newsapp-teal" />
            </div>
            <div>
              <h1 className="text-xl font-bold">#{hashtagInfo.name}</h1>
              <p className="text-sm text-gray-600">{searchDescription}</p>
            </div>
          </div>
        )}
        
        {query && (
          <div className="mb-6">
            <h1 className="text-xl font-bold">Kết quả tìm kiếm</h1>
            <p className="text-sm text-gray-600">{searchDescription}</p>
          </div>
        )}
        
        {results.length > 0 ? (
          <NewsList items={results} variant="default" />
        ) : (
          <div className="rounded-xl bg-white p-8 text-center">
            <p className="text-lg font-medium text-gray-600">Không tìm thấy kết quả nào</p>
            <p className="mt-2 text-sm text-gray-500">
              {query ? 'Hãy thử tìm kiếm với từ khóa khác' : 'Không có bài viết nào với hashtag này'}
            </p>
          </div>
        )}
      </main>
      
      <Navbar />
    </div>
  );
};

export default SearchPage;
