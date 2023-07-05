import React, { useEffect, useState } from 'react';
import { getRandomNumber } from '../utils/random';

const Countdown = () => {
  const [count, setCount] = useState(getRandomNumber(30, 60));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Countdown: {count} seconds</div>;
};

export default Countdown;
