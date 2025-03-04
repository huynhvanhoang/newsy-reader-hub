
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onFinish();
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-newsapp-teal-light to-white">
      <div className="splash-logo text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-newsapp-teal p-4 shadow-lg">
          <span className="text-4xl font-bold text-white">24h</span>
        </div>
        <h1 className="text-2xl font-bold text-newsapp-teal">Đọc báo 24h</h1>
        {isLoading && (
          <div className="mt-8">
            <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
              <div className="animate-pulse h-full w-full bg-newsapp-teal"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
