import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Countdown from './components/Countdown';
import ClassTable from './components/ClassTable';
import Cart from './components/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const randomCountdownSeconds = Math.floor(Math.random() * 31) + 30;
    setCountdownSeconds(randomCountdownSeconds);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomCountdownSeconds = Math.floor(Math.random() * 31) + 30;
      setCountdownSeconds(randomCountdownSeconds);
    }, 60000); // Update countdown every 60 seconds

    return () => clearInterval(timer);
  }, []);

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  
  const addToCart = (item) => {
    const bookedCount = cartItems.reduce((count, cartItem) => {
      const cartItemWeek = getWeekNumber(new Date(cartItem.date));
      const itemWeek = getWeekNumber(new Date(item.date));
      if (cartItemWeek === itemWeek) {
        return count + 1;
      }
      return count;
    }, 0);
  
    if (bookedCount >= 3) {
      alert('You can only book a maximum of 3 classes per week.');
      return;
    }
  
    setCartItems((prevItems) => [...prevItems, item]);
  };
  

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((c) => c.date !== item.date));
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const cartCount = cartItems.length;


  return (
    <div>
      <h1>Class Booking App</h1>
      <Countdown seconds={countdownSeconds} />
      <div className="cart-wrapper">
        <button className="cart-button" onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        {showCart ? (
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        ) : (
          <ClassTable addToCart={addToCart} />
        )}
      </div>
    </div>
  );
};

export default App;
