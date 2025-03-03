
import NewsCard, { NewsItem } from './NewsCard';

interface NewsListProps {
  items: NewsItem[];
  variant?: 'default' | 'compact';
  columnLayout?: 'single' | 'double' | 'triple';
}

const NewsList = ({ 
  items, 
  variant = 'default',
  columnLayout = 'single'
}: NewsListProps) => {
  
  let gridClassName = "grid gap-4";
  
  if (variant === 'default') {
    // Default cards
    if (columnLayout === 'double') {
      gridClassName += " grid-cols-1 sm:grid-cols-2";
    } else if (columnLayout === 'triple') {
      gridClassName += " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    } else {
      gridClassName += " grid-cols-1";
    }
  } else {
    // Compact cards always stack in a single column
    gridClassName = "space-y-3";
  }
  
  return (
    <div className={gridClassName}>
      {items.map((item) => (
        <NewsCard key={item.id} item={item} variant={variant} />
      ))}
    </div>
  );
};

export default NewsList;
