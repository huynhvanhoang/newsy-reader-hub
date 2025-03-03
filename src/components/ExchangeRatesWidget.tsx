
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRate {
  currency: string;
  code: string;
  buyRate: string;
  sellRate: string;
  change?: 'up' | 'down' | 'stable';
}

interface ExchangeRatesWidgetProps {
  rates: ExchangeRate[];
  lastUpdated: string;
}

const ExchangeRatesWidget = ({ rates, lastUpdated }: ExchangeRatesWidgetProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-lg font-semibold">Ngoại tệ</h3>
      
      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.code} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-sm font-medium">
                {rate.code}
              </div>
              <div>
                <p className="text-sm font-medium">{rate.currency}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-gray-500">Mua</p>
                  <p className="text-sm font-medium text-newsapp-teal">{rate.buyRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bán</p>
                  <p className="text-sm font-medium">{rate.sellRate}</p>
                </div>
                {rate.change && (
                  <div>
                    {rate.change === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {rate.change === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-3 text-xs text-gray-500">
        Cập nhật: {lastUpdated}
      </p>
    </div>
  );
};

export default ExchangeRatesWidget;
