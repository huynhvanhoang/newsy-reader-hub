
import { Calendar } from 'lucide-react';
import Header from '@/components/Header';
import HorizontalCategories from '@/components/HorizontalCategories';

interface TopSectionProps {
  currentDate: string;
}

const TopSection = ({ currentDate }: TopSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-newsapp-teal to-blue-500 pb-2">
      <Header transparent={true} />
      
      <div className="container mx-auto px-4 mt-2">
        <HorizontalCategories />
      </div>
      
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center gap-2 text-white/90 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
