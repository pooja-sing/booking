// Utility function to generate random number between min and max (inclusive)
export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  