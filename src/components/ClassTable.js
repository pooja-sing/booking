import React, { useState, useEffect } from 'react';
import { getRandomNumber } from '../utils/random';
import '../styles/ClassTable.css';

const ClassTable = ({ addToCart }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    generateRandomClasses();
  }, []);

  const generateRandomClasses = () => {
    const days = ['Monday', 'Wednesday', 'Friday/Saturday'];
    const futureDates = getFutureDates(15);
    const randomClasses = futureDates.map((date) => {
      const day = days[Math.floor(Math.random() * days.length)];
      const time = getTime();
      const seats = getRandomNumber(0, 15);
      const booked = seats === 0;
      return { date, day, time, seats, booked };
    });
    setClasses(randomClasses);
  };

  const getFutureDates = (count) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const renderDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const getTime = () => {
    const hours = getRandomNumber(9, 17);
    const start = new Date();
    start.setHours(hours, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    return { start, end };
  };

  const renderTime = (start, end) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const startTime = start.toLocaleTimeString('en-US', options);
    const endTime = end.toLocaleTimeString('en-US', options);
    return `${startTime} - ${endTime}`;
  };
  const bookClass = (cls) => {
    if (cls.booked) return;

    const bookedCount = classes.filter((c) => c.booked && c.day === cls.day).length;

    if (bookedCount >= 3) {
      alert('You can only book a maximum of 3 classes per week.');
      return;
    }

    setClasses((prevClasses) =>
      prevClasses.map((c) => {
        if (c.date === cls.date) {
          return { ...c, booked: true, seats: c.seats - 1 };
        }
        return c;
      })
    );

    addToCart(cls);
  };

  return (
    <table className="class-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((cls) => (
          <tr key={cls.date}>
            <td>{renderDate(cls.date)}</td>
            <td>{renderTime(cls.time.start, cls.time.end)}</td>
            <td>{cls.seats === 0 ? 'Full' : `${cls.seats} seats left`}</td>
            <td>
              <button
                className={cls.seats === 0 ? 'full-btn' : 'book-now'}
                onClick={() => bookClass(cls)}
                disabled={cls.seats === 0}
              >
                {cls.seats === 0 ? 'Full' : 'Book Now'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClassTable;
