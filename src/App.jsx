import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import lovesvg from "/assets/images/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "/assets/images/Love In The Air SVG Cut File.svg";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FloatingHearts } from './components/FloatingHearts';
import clickSound from '/assets/images/sounds/Ily.mp3';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { MusicPlayer } from './components/MusicPlayer';
import { ConfirmationPage } from './components/ConfirmationPage';

export default function App() {
  return (
    <Router>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/valentine" element={<Page />} />
        <Route path="/confirmed" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

function Page() {
  const navigate = useNavigate();
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    if (yesPressed) {
      const timer = setTimeout(() => {
        navigate('/confirmed');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [yesPressed, navigate]);

  const handleNoClick = useCallback(() => {
    setNoCount(noCount + 1);
  }, [noCount]);

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const runConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      particleCount: 100,
      spread: 160
    };

    confetti({...defaults, particleCount: count * 0.25});
    confetti({...defaults, angle: 60});
    confetti({...defaults, angle: 120});
  }, []);

  const sound = new Howl({
    src: [clickSound],
    volume: 0.5
  });

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900 bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 animate-gradient">
      <FloatingHearts />
      {yesPressed ? (
        <div className="animate-fade-in">
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="text-4xl md:text-6xl font-bold my-4 text-center">
            Yayy!!! I'm so happy! 💖
          </div>
        </div>
      ) : (
        <>
          <img
            src={lovesvg}
            className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28"
          />
          <img
            src={lovesvg2}
            className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32"
          />
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            className="max-w-3xl mx-auto"
          >
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/7.jpeg"
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/9.jpeg"
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/10.jpeg"
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/4.jpeg"
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/5.jpeg" 
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/6.jpeg"
              />
            </div>
            <div>
              <img
                className="h-64 md:h-96 object-cover rounded-xl"
                src="/assets/images/8.jpeg"
              />
            </div>
          </Carousel>
          <h1 className="text-4xl md:text-6xl my-4 text-center">
            Will you be my Valentine?
          </h1>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => {
                setYesPressed(true);
                runConfetti();
                sound.play();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                handleNoClick();
              }}
              className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 left-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://www.facebook.com/Mark.Dassiduous.02/"
      target="__blank"
    >
      Love, Mark{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </a>
  );
};
