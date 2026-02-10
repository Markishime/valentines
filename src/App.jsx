import { useState, useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import lovesvg from "/assets/images/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "/assets/images/Love In The Air SVG Cut File.svg";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FloatingHearts } from './components/FloatingHearts';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { LoveLanguageGame } from './components/LoveLanguageGame';
import { motion, AnimatePresence } from 'framer-motion';

// Short sound effects (no background music)
const sounds = {
  click: new Howl({ src: ['/assets/images/sounds/I Wanna Grow Old With You - Westlife.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['/assets/images/sounds/I Wanna Grow Old With You - Westlife.mp3'], volume: 0.25 }),
  success: new Howl({ src: ['/assets/images/sounds/I Wanna Grow Old With You - Westlife.mp3'], volume: 0.6 }),
  no: new Howl({ src: ['/assets/images/sounds/I Wanna Grow Old With You - Westlife.mp3'], volume: 0.3 }),
  sparkle: new Howl({ src: ['/assets/images/sounds/I Wanna Grow Old With You - Westlife.mp3'], volume: 0.35 })
};

const messages = [
  "Wait, 2026 needs us together.",
  "Are you really saying no to SM Seaside?",
  "Think of Fantasy World before you click that.",
  "Last chance to lock in our 2026 love day.",
  "Babyyy, don\u2019t break our Cebu plan.",
  "Future us is screaming: say yes.",
  "What if this is the best day of 2026?",
  "My heart already reserved this date for you.",
  "Plot twist: you actually wanted to say yes.",
  "Imagine the arcade tickets we could win together.",
  "Have a heart, it\u2019s Valentine\u2019s 2026.",
  "You can\u2019t outrun love (or this button).",
  "Our SM Seaside story deserves a yes.",
  "Tiny website, huge feelings. Try again.",
  "You\u2019re my favorite notification, don\u2019t ghost this.",
  "I upgraded everything for 2026, including us.",
  "Close your eyes, think of Cebu, now click yes.",
  "This date is better than any scroll on your feed.",
  "We look so good in 2026 together.",
  "One yes and the whole plan comes to life."
];

const loveQuotes = [
  "In 2026 and every year after, it\u2019s still you.",
  "My favorite place isn\u2019t SM Seaside, it\u2019s next to you.",
  "Every version of my future has you in it.",
  "Your laugh is my favorite sound of this decade.",
  "Love in 2026 still feels like day one with you.",
  "I don\u2019t need a filter when I\u2019m with you.",
  "From morning notifications to midnight talks, it\u2019s always you.",
  "You turn ordinary mall days into core memories.",
  "No matter the year, my heart keeps choosing you.",
  "If 2026 had a highlight reel, it would just be us.",
  "Hand in hand, we make everywhere feel like home.",
  "I\u2019d pick you in every timeline, every lifetime.",
  "Your smile is my favorite view, even in a city of lights.",
  "You are my soft place in a loud world.",
  "My heart has a permanent reservation under your name."
];

const images = [
  '/assets/images/1.jpg',
  '/assets/images/2.jpg',
  '/assets/images/3.jpg',
  '/assets/images/4.jpg',
  '/assets/images/5.jpg',
  '/assets/images/6.jpg',
  '/assets/images/7.jpg',
  '/assets/images/8.jpg',
  '/assets/images/9.jpg'
];

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
        <FloatingHearts />

        {/* Soft global frame */}
        <div className="pointer-events-none fixed inset-4 border border-white/60 rounded-3xl z-0 opacity-60" />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/love-language-game" element={<LoveLanguageGame />} />
            <Route path="/valentine" element={<Page />} />
            <Route path="/confirmed" element={<ConfirmationPage />} />
          </Routes>
        </AnimatePresence>

        {/* Corner decoration */}
        <div className="fixed top-5 right-5 z-10 opacity-70">
          <motion.img
            animate={{ 
              rotate: [0, 6, -6, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            src={lovesvg}
            alt="Love Decoration"
            className="w-14 h-14 md:w-16 md:h-16 drop-shadow-md"
          />
        </div>
      </div>
    </Router>
  );
}

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [buttonSize, setButtonSize] = useState(16);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [shake, setShake] = useState(false);
  const [mouseTrails, setMouseTrails] = useState([]);
  const [deviceType, setDeviceType] = useState('desktop');
  const [currentImage, setCurrentImage] = useState(0);

  const moodWishes = location.state?.moodTagsSelected || [];

  const yesButtonSize = buttonSize + Math.min(noCount * 30, 300);

  // Device Type Detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse Trail Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5)
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Quote Rotation
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % loveQuotes.length);
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  // Image Rotation
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, []);

  // Button Handlers
  const handleYesClick = () => {
    setYesPressed(true);
    sounds.success.play();
    setShowSparkles(true);
    
    setTimeout(() => {
      navigate('/confirmed');
    }, 3500);
  };

  const handleNoClick = () => {
    sounds.no.play();
    setNoCount(noCount + 1);
    setButtonSize(buttonSize + Math.min(noCount * 8, 80));
    setShowHearts(true);
    setShake(true);
    
    setTimeout(() => setShake(false), 500);
  };

  const handleYesHover = () => {
    sounds.hover.play();
    sounds.sparkle.play();
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 animate-gradient overflow-hidden p-4">
      <AnimatePresence>
        {showHearts && <FloatingHearts />}
        
        {showSparkles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 animate-sparkle">
              ✨✨✨
            </div>
          </motion.div>
        )}

        {mouseTrails.map((trail) => (
          <motion.div
            key={trail.id}
            className="pointer-events-none fixed w-4 h-4 rounded-full bg-pink-400 opacity-50 blur-sm"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 0,
              x: trail.x,
              y: trail.y,
            }}
            transition={{ duration: 0.5 }}
            style={{
              left: trail.x,
              top: trail.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>

      <div className="text-center space-y-10 relative w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full px-4"
        >
          <p className="text-xl md:text-2xl text-rose-600 font-semibold animate-fade-in">
            {loveQuotes[currentQuote]}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="carousel-container max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="carousel-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={currentImage}
            >
              <div className="h-64 md:h-96 rounded-3xl w-full shadow-2xl border border-white/70 bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src={images[currentImage]}
                  alt={`Love Memory ${currentImage + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-lg text-rose-600 px-6 max-w-2xl mx-auto"
        >
          Hi babyyy, before we lock in our SM Seaside Cebu 2026 adventure, I have one simple
          question for you.
        </motion.p>

        <motion.h1
          animate={shake ? {
            x: [-10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
          } : {}}
          className="text-3xl md:text-6xl font-bold text-rose-600 drop-shadow-lg px-4"
        >
          Spend Valentine&apos;s 2026 at SM Seaside Cebu with me?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/70 shadow-xl shadow-rose-200/80 p-6 md:p-8 text-left space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-rose-500">
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                Valentine&apos;s Day • February 14, 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                SM Seaside City Cebu
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                Simple • Playful • Romantic
              </span>
            </div>

            <p className="text-rose-700 text-sm md:text-base">
              I want our 2026 Valentine to feel light and happy — just you and me, holding hands,
              laughing, and making soft little memories.
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base text-rose-700">
              <div className="space-y-2">
                <p className="font-semibold text-rose-600">What we&apos;ll do together</p>
                <ul className="list-disc list-inside space-y-1 text-rose-600/90">
                  <li>Play in the <span className="font-semibold">Fantasy World</span> at SM Seaside Cebu.</li>
                  <li>Get competitive (in a cute way) at the <span className="font-semibold">arcade</span>.</li>
                  <li>Try <span className="font-semibold">archery</span> side by side like modern Cupids.</li>
                  <li>End with a <span className="font-semibold">romantic dinner</span>.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-rose-600">How I imagine it</p>
                <p className="text-rose-600/90">
                  Warm lights, your laugh echoing over the games, our fingers intertwined while we walk,
                  and a quiet dinner to end the night where I can look at you and say, again and again,
                  how much I love you.
                </p>
              </div>
            </div>

            {moodWishes.length > 0 && (
              <div className="pt-4 border-t border-rose-100 space-y-2">
                <p className="text-xs md:text-sm font-semibold text-rose-600">
                  Little 2026 wishes you picked:
                </p>
                <div className="flex flex-wrap gap-2">
                  {moodWishes.map((wish) => (
                    <span
                      key={wish}
                      className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs md:text-sm border border-rose-200"
                    >
                      {wish}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              bg-green-500 hover:bg-green-600 text-white rounded-lg
              transition-all transform
              ${yesPressed ? 'animate-pulse' : ''}
              hover:shadow-lg hover:shadow-green-300/50
              ${deviceType === 'mobile' ? 'text-2xl' : ''}
            `}
            style={{
              fontSize: deviceType === 'mobile' ? '24px' : `${yesButtonSize}px`,
              padding: `${Math.max(16, yesButtonSize/4)}px ${Math.max(24, yesButtonSize/2)}px`,
              animation: showSparkles ? 'sparkle 1s ease infinite' : 'none'
            }}
            onClick={handleYesClick}
            onMouseEnter={handleYesHover}
          >
            Yes 🥰
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-rose-500 hover:bg-rose-600 text-white text-lg px-8 py-4 rounded-lg
              transition-all transform
              ${shake ? 'animate-shake' : ''}
              ${deviceType === 'mobile' ? 'text-xl' : ''}
            `}
            onClick={handleNoClick}
            onMouseEnter={() => sounds.hover.play()}
          >
            {messages[Math.min(noCount, messages.length - 1)]} 😢
          </motion.button>
        </div>

        {noCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-rose-600 text-lg md:text-xl animate-bounce px-4"
          >
            Attempts to say no: {noCount}
          </motion.div>
        )}
      </div>
    </div>
  );
};
