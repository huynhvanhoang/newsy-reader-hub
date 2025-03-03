
import { useState } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import WeatherWidget from '@/components/WeatherWidget';
import ExchangeRatesWidget from '@/components/ExchangeRatesWidget';
import LotteryWidget from '@/components/LotteryWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UtilitiesPage = () => {
  const [activeTab, setActiveTab] = useState("weather");
  
  return (
    <div className="min-h-screen bg-newsapp-background pb-20">
      <Header title="Tiện ích" />
      
      <main className="container mx-auto px-4 pt-4 animate-fade-in">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <Tabs defaultValue="weather" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="weather">Thời tiết</TabsTrigger>
              <TabsTrigger value="exchange">Tỷ giá</TabsTrigger>
              <TabsTrigger value="lottery">Xổ số</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weather" className="animate-fade-up">
              <WeatherWidget />
            </TabsContent>
            
            <TabsContent value="exchange" className="animate-fade-up">
              <ExchangeRatesWidget />
            </TabsContent>
            
            <TabsContent value="lottery" className="animate-fade-up">
              <LotteryWidget />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Tiện ích khác</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m4.5 8 3 4c.8 1.5 2.7 3 5.5 3s4.7-1.5 5.5-3l3-4"></path>
                  <path d="M14 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                </svg>
              </div>
              <span className="text-center font-medium">Lịch chiếu phim</span>
            </button>
            
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                  <line x1="8" x2="16" y1="21" y2="21"></line>
                  <line x1="12" x2="12" y1="17" y2="21"></line>
                </svg>
              </div>
              <span className="text-center font-medium">Lịch phát sóng TV</span>
            </button>
            
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <path d="M17 11h1a3 3 0 0 1 0 6h-1"></path>
                  <path d="M9 12v6"></path>
                  <path d="M13 12v6"></path>
                  <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5s2-.5 3-.5 2 .5 3 .5 1.44-.5 3-.5a2.5 2.5 0 0 1 0 5c-1.56 0-2-.5-3-.5Z"></path>
                </svg>
              </div>
              <span className="text-center font-medium">Giá vàng</span>
            </button>
            
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <path d="M4 11a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"></path>
                  <path d="M15 6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z"></path>
                  <path d="M10 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z"></path>
                  <path d="M10 15a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z"></path>
                </svg>
              </div>
              <span className="text-center font-medium">Thống kê COVID</span>
            </button>
            
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <path d="M20 4v16H4V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"></path>
                  <path d="M12 14v6"></path>
                  <path d="M8 9V7h2"></path>
                  <path d="M16 11V9h-2"></path>
                  <path d="M8 14a4 4 0 0 1 8 0"></path>
                </svg>
              </div>
              <span className="text-center font-medium">Lịch âm</span>
            </button>
            
            <button className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-4 rounded-full bg-newsapp-teal/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-newsapp-teal">
                  <path d="m19 5-7 7-7-7"></path>
                  <path d="M19 13H5a6 6 0 0 0 0 12h14a6 6 0 0 0 0-12Z"></path>
                </svg>
              </div>
              <span className="text-center font-medium">Chứng khoán</span>
            </button>
          </div>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

export default UtilitiesPage;
