
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Hashtag {
  id: number;
  name: string;
  slug?: string;
}

const HashtagScrollbar = () => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHashtags() {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('id, name');
        
        if (error) {
          console.error('Error fetching hashtags:', error);
          return;
        }
        
        // Transform the data to include a slug field
        const transformedData = data.map(tag => ({
          id: tag.id,
          name: tag.name,
          slug: tag.name.toLowerCase().replace(/\s+/g, '-')
        }));
        
        setHashtags(transformedData || []);
      } catch (error) {
        console.error('Failed to fetch hashtags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHashtags();
  }, []);

  if (loading) {
    return (
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 py-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="flex-shrink-0 rounded-full bg-gray-200 px-4 py-2 h-8 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 py-1">
        {hashtags.map((hashtag) => (
          <Link 
            key={hashtag.id} 
            to={`/search?hashtag=${hashtag.slug || hashtag.name}`}
            className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
          >
            # {hashtag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HashtagScrollbar;
