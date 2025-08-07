import { useState, useEffect } from 'react';

export default function Date() {
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentDateTime(now);
    }, 1000);

    return () => clearInterval(timer); // clean up interval on unmount
  }, []);

  return currentDateTime;
}
