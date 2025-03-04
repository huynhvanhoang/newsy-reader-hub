
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export interface NewsItem {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug: string;
  published_at: string;
  category?: string;
  category_id?: number;
  views?: number;
  source?: string;
  timestamp?: string;
  image?: string;
}

interface NewsCardProps {
  item: NewsItem;
  variant?: 'default' | 'featured' | 'compact';
}

const NewsCard = ({ item, variant = 'default' }: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format the date
  const formattedDate = item.timestamp || (item.published_at ? 
    formatDistanceToNow(new Date(item.published_at), { addSuffix: true, locale: vi }) : 
    '');
  
  // Use image_url from database or fallback to image from static data
  const imageUrl = item.image_url || item.image || '/placeholder.svg';
  
  if (variant === 'featured') {
    return (
      <Link 
        to={`/article/${item.slug}`} 
        className="group relative overflow-hidden rounded-xl news-card-transition"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <span className="sr-only">Loading</span>
            </div>
          )}
          <img
            src={imageUrl}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block rounded-md bg-newsapp-teal px-2 py-1 text-xs font-medium">
              {item.category || 'Tin tức'}
            </span>
            <div className="flex items-center text-xs font-medium text-white/80">
              <Clock className="mr-1 h-3 w-3" />
              {formattedDate}
            </div>
          </div>
          <h3 className="text-balance text-xl font-bold leading-tight mb-2">
            {item.title}
          </h3>
          <p className="text-xs font-medium text-white/90">{item.source || 'Báo 24h'}</p>
        </div>
      </Link>
    );
  }
  
  if (variant === 'compact') {
    return (
      <Link 
        to={`/article/${item.slug}`} 
        className="flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <span className="sr-only">Loading</span>
            </div>
          )}
          <img
            src={imageUrl}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-balance text-sm font-medium leading-tight line-clamp-2 group-hover:text-newsapp-teal transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-newsapp-teal">
              {item.source || 'Báo 24h'}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link 
      to={`/article/${item.slug}`} 
      className="flex flex-col overflow-hidden rounded-xl bg-white news-card-transition"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <img
          src={imageUrl}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block rounded-md bg-newsapp-source-tag px-2 py-1 text-xs font-medium text-gray-700">
            {item.source || 'Báo 24h'}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        
        <h3 className="text-balance flex-1 text-base font-semibold leading-tight mb-2">
          {item.title}
        </h3>
        
        {item.summary && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.summary}</p>
        )}
        
        <div className="mt-auto pt-2">
          <span className="inline-block rounded-md bg-newsapp-teal/10 px-2 py-1 text-xs font-medium text-newsapp-teal">
            {item.category || 'Tin tức'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
