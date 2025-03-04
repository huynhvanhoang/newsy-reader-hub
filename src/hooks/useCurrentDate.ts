
import { useState, useEffect } from 'react';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get current date in Vietnamese format
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    setCurrentDate(`${day === 'Chủ nhật' ? day : `Thứ ${day.split(' ')[1]}`}, ${date} tháng ${month}, ${year}`);
  }, []);

  return currentDate;
};

export default useCurrentDate;
