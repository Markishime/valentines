import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfirmationPage = () => {
  useEffect(() => {
    // Celebration effect on mount
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 animate-gradient">
      <div className="text-center space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-8">
          You've Made Me The Happiest! 💖
        </h1>
        <div className="space-y-4 text-xl md:text-2xl text-rose-700">
          <p>Thank you for saying Yes BABYYY!</p>
          <p>You've filled my heart with joy 💝</p>
          <p>Looking forward to our date tomorrow!!! I LOVE YOUUU!!! 💑</p>
        </div>
        <img 
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnN0ajEyOTUwems2cG4wYzcwdWM2NndlbXZ6NG0wazRhbWltNGNrYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FDbIUZLwbCUS4786z3/giphy.gif"
          alt="Celebration"
          className="mx-auto rounded-lg shadow-xl h-64 md:h-96 object-cover"
        />
      </div>
    </div>
  );
};
