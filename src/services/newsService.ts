
import { supabase } from '@/integrations/supabase/client';
import { NewsItem } from '@/components/NewsCard';

// Transform a database article to match the NewsItem interface
export const transformArticleToNewsItem = (article: any): NewsItem => {
  return {
    id: article.id.toString(),
    title: article.title,
    summary: article.summary || '',
    content: article.content || '',
    image: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: article.categories?.name || 'Tin tức',
    source: 'Báo 24h',
    timestamp: formatTimestamp(article.publish_date),
    // Generate a slug from the title if not available
    slug: article.url ? article.url.split('/').pop() : article.title.toLowerCase().replace(/\s+/g, '-'),
    published_at: article.publish_date
  };
};

// Format timestamp for display
export const formatTimestamp = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    return 'Vừa mới';
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  }
};

// Fetch featured news
export const fetchFeaturedNews = async (): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .order('publish_date', { ascending: false })
      .limit(5);
    
    if (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    }
    
    if (!data) return [];
    
    return data.map(article => transformArticleToNewsItem(article));
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }
};

// Fetch latest news
export const fetchLatestNews = async (limit: number = 6): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .order('publish_date', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching latest articles:', error);
      return [];
    }
    
    if (!data) return [];
    
    return data.map(article => transformArticleToNewsItem(article));
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
};

// Fetch trending news (most viewed)
export const fetchTrendingNews = async (limit: number = 5): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .order('publish_date', { ascending: false }) // Using publish_date since 'views' might not exist
      .limit(limit);
    
    if (error) {
      console.error('Error fetching trending articles:', error);
      return [];
    }
    
    if (!data) return [];
    
    return data.map(article => transformArticleToNewsItem(article));
  } catch (error) {
    console.error('Error fetching trending news:', error);
    return [];
  }
};

// Fetch news by category
export const fetchNewsByCategory = async (categoryId: number, limit: number = 10): Promise<NewsItem[]> => {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .eq('category_id', categoryId)
      .order('publish_date', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching category articles:', error);
      return [];
    }
    
    if (!data) return [];
    
    return data.map(article => transformArticleToNewsItem(article));
  } catch (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
};

// Fetch news by hashtag - improved with better error handling
export const fetchNewsByHashtag = async (hashtagSlug: string, limit: number = 10): Promise<NewsItem[]> => {
  try {
    // First get the hashtag id
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select('id, name')
      .ilike('name', `%${hashtagSlug}%`) // More flexible search with ILIKE
      .limit(1);
    
    if (tagError || !tagData || tagData.length === 0) {
      console.error('Error fetching hashtag:', tagError || 'No tag found');
      return [];
    }
    
    // Then get the articles with this hashtag
    const { data: newsTagsData, error: newsTagsError } = await supabase
      .from('news_tags')
      .select('news_id')
      .eq('tag_id', tagData[0].id);
    
    if (newsTagsError || !newsTagsData || newsTagsData.length === 0) {
      console.error('Error fetching news tags:', newsTagsError || 'No articles found for this tag');
      return [];
    }
    
    // Get the articles
    const articleIds = newsTagsData.map(item => item.news_id);
    const { data: articlesData, error: articlesError } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .in('id', articleIds)
      .order('publish_date', { ascending: false })
      .limit(limit);
    
    if (articlesError || !articlesData) {
      console.error('Error fetching articles by hashtag:', articlesError);
      return [];
    }
    
    return articlesData.map(article => transformArticleToNewsItem(article));
  } catch (error) {
    console.error('Error in fetchNewsByHashtag:', error);
    return [];
  }
};

// New function: Fetch article by slug
export const fetchArticleBySlug = async (slug: string): Promise<NewsItem | null> => {
  try {
    console.log("Fetching article with slug:", slug);
    
    // Extract the base slug without extensions if any
    const baseSlug = slug.split('.')[0];
    
    // First, try to find by exact slug match
    const { data, error } = await supabase
      .from('news_articles')
      .select(`
        id,
        title,
        summary,
        content,
        image_url,
        url,
        publish_date,
        category_id,
        categories(name)
      `)
      .or(`url.ilike.%${slug}%, url.ilike.%${baseSlug}%`)
      .limit(1);
    
    if (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      console.log("No article found with slug:", slug);
      return null;
    }
    
    console.log("Found article:", data[0]);
    return transformArticleToNewsItem(data[0]);
  } catch (error) {
    console.error('Error in fetchArticleBySlug:', error);
    return null;
  }
};
