import { useEffect } from 'react';

export const FloatingHearts = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 3 + 2 + 's';
      heart.innerText = '❤️';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 5000);
    };
    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return null;
};
