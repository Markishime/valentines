import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 animate-gradient">
      <div className="text-center space-y-8 animate-fade-in">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2djcnI1aHptZnNyOHdzMHBxbTQ1bnVjN2Rremxta2thZXF1bW95bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif"
          alt="I love you!"
          className="mx-auto rounded-lg shadow-xl mb-8 h-64 md:h-96 object-cover"
        />
        <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-8">
          Hey BABYYY! 💌
        </h1>
        <p className="text-xl md:text-2xl text-rose-500 mb-8">
          I have something special for you...
        </p>
        <button
          onClick={() => navigate('/love-language-game')}
          className="bg-rose-500 hover:bg-rose-600 text-white text-xl md:text-2xl px-8 py-4 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Open Your Valentine 💝
        </button>
      </div>
    </div>
  );
};
