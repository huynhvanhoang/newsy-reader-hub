
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

interface WeatherData {
  location: string;
  currentTemp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'drizzle';
  lowTemp: number;
  highTemp: number;
}

interface WeatherWidgetProps {
  data: WeatherData;
}

const weatherIcons = {
  sunny: <Sun className="h-8 w-8 text-yellow-500" />,
  cloudy: <Cloud className="h-8 w-8 text-gray-400" />,
  rainy: <CloudRain className="h-8 w-8 text-blue-400" />,
  stormy: <CloudLightning className="h-8 w-8 text-purple-500" />,
  snowy: <CloudSnow className="h-8 w-8 text-blue-200" />,
  drizzle: <CloudDrizzle className="h-8 w-8 text-blue-300" />
};

const getBgClass = (condition: WeatherData['condition']) => {
  const classes = {
    sunny: 'from-yellow-400/20 to-orange-300/20',
    cloudy: 'from-gray-200/40 to-gray-300/40',
    rainy: 'from-blue-300/20 to-blue-400/20',
    stormy: 'from-purple-300/20 to-purple-400/20',
    snowy: 'from-blue-100/30 to-blue-200/30',
    drizzle: 'from-blue-200/20 to-blue-300/20'
  };
  return classes[condition];
};

const WeatherWidget = ({ data }: WeatherWidgetProps) => {
  return (
    <div className={`rounded-xl bg-gradient-to-br ${getBgClass(data.condition)} p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">{data.location}</h3>
          <div className="mt-1 flex items-end gap-1">
            <span className="text-3xl font-bold">{data.currentTemp}°</span>
            <span className="text-sm text-gray-500">
              {data.lowTemp}° / {data.highTemp}°
            </span>
          </div>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
          {weatherIcons[data.condition]}
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Bạn quan tâm thời tiết tỉnh/thành phố nào?
      </div>
    </div>
  );
};

export default WeatherWidget;
