import { useState, useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import lovesvg from "/assets/images/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "/assets/images/Love In The Air SVG Cut File.svg";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FloatingHearts } from './components/FloatingHearts';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { LoveLanguageGame } from './components/LoveLanguageGame';
import { motion, AnimatePresence } from 'framer-motion';

// Sound effects with enhanced volume control
const sounds = {
  click: new Howl({ src: ['/assets/images/sounds/click.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['/assets/images/sounds/hover.mp3'], volume: 0.3 }),
  success: new Howl({ src: ['/assets/images/sounds/success.mp3'], volume: 0.5 }),
  no: new Howl({ src: ['/assets/images/sounds/no.mp3'], volume: 0.4 }),
  heartbeat: new Howl({ src: ['/assets/images/sounds/heartbeat.mp3'], volume: 0.3, loop: true }),
  sparkle: new Howl({ src: ['/assets/images/sounds/sparkle.mp3'], volume: 0.2 }),
  background: new Howl({ 
    src: ['/assets/images/sounds/Valentine.mp3'], 
    volume: 0.5, 
    loop: true 
  })
};

const messages = [
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
  "I'll be so sad...",
  "Maybe think about it?",
  "You'll miss out on something special!",
  "But we're perfect together!",
  "Just give it a chance!"
];

const loveQuotes = [
  "Every time I see you, I fall in love all over again.",
  "You're the missing piece to my puzzle.",
  "My heart beats only for you.",
  "You make every day special.",
  "You're my favorite notification.",
  "Life is better with you in it.",
  "You're the first thought in my morning and the last thought at night.",
  "Your smile brightens up my darkest days.",
  "With you, every moment feels magical.",
  "You're not just my valentine, you're my everything.",
  "Together is my favorite place to be.",
  "You had me at hello.",
  "I love you more than yesterday, less than tomorrow.",
  "You're the reason I believe in love.",
  "My heart is wherever you are."
];

const images = [
  '/assets/images/7.jpeg',
  '/assets/images/9.jpeg',
  '/assets/images/10.jpeg',
  '/assets/images/4.jpeg',
  '/assets/images/5.jpeg',
  '/assets/images/6.jpeg',
  '/assets/images/8.jpeg'
];

export default function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const totalAssets = images.length + Object.keys(sounds).length;

  // Enhanced Asset Loading
  useEffect(() => {
    let mounted = true;
    
    const loadAssets = async () => {
      try {
        // Load images
        const imagePromises = images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              if (mounted) {
                setAssetsLoaded(prev => prev + 1);
              }
              resolve();
            };
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              resolve(); // Still resolve to continue loading
            };
            img.src = src;
          });
        });

        // Load sounds
        const soundPromises = Object.values(sounds).map(sound => {
          return new Promise((resolve) => {
            if (sound.state() === 'loaded') {
              if (mounted) {
                setAssetsLoaded(prev => prev + 1);
              }
              resolve();
            } else {
              sound.once('load', () => {
                if (mounted) {
                  setAssetsLoaded(prev => prev + 1);
                }
                resolve();
              });
              sound.once('loaderror', () => {
                console.warn('Sound failed to load');
                resolve(); // Still resolve to continue loading
              });
            }
          });
        });

        await Promise.all([...imagePromises, ...soundPromises]);
        
        if (mounted) {
          // Small delay to ensure smooth transition
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        console.error('Asset loading failed:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssets();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Update loading progress
  useEffect(() => {
    setLoadingProgress((assetsLoaded / totalAssets) * 100);
  }, [assetsLoaded, totalAssets]);

  // Enhanced Loading Screen
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 flex items-center justify-center z-50">
      <div className="text-center space-y-6 p-8 bg-white/30 backdrop-blur-md rounded-2xl">
        <div className="relative">
          <div className="animate-pulse text-8xl">❤️</div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-ping text-8xl opacity-50">
            ❤️
          </div>
        </div>
        <h2 className="text-3xl font-bold text-rose-600">Loading Love...</h2>
        <div className="w-64 h-3 bg-white/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-300 rounded-full"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-rose-700 font-medium">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="relative min-h-screen">
        <FloatingHearts />
        
        {/* Background Music Toggle with enhanced UI */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            sounds.click.play();
            if (isMusicPlaying) {
              sounds.background.fade(0.3, 0, 1000);
              setTimeout(() => sounds.background.pause(), 1000);
            } else {
              sounds.background.play();
              sounds.background.fade(0, 0.3, 1000);
            }
            setIsMusicPlaying(!isMusicPlaying);
          }}
          className="fixed bottom-4 left-4 z-50 bg-white/50 p-3 rounded-full hover:bg-white/70 transition-all shadow-lg backdrop-blur-sm"
        >
          <span className="text-2xl">
            {isMusicPlaying ? '🎵' : '🔇'}
          </span>
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 left-20 z-50 bg-white/50 p-3 rounded-full hover:bg-white/70 transition-all shadow-lg backdrop-blur-sm"
        >
          <span className="text-2xl">🌙</span>
        </motion.button>

        {/* Social Share */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 left-36 z-50 bg-white/50 p-3 rounded-full hover:bg-white/70 transition-all shadow-lg backdrop-blur-sm"
        >
          <span className="text-2xl">💌</span>
        </motion.button>

        <AnimatePresence>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/love-language-game" element={<LoveLanguageGame />} />
            <Route path="/valentine" element={<Page />} />
            <Route path="/confirmed" element={<ConfirmationPage />} />
          </Routes>
        </AnimatePresence>

        {/* Decorative Elements */}
        <div className="fixed top-4 right-4 z-10 opacity-50">
          <motion.img
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            src={lovesvg}
            alt="Love Decoration"
            className="w-16 h-16"
          />
        </div>
      </div>
    </Router>
  );
}

const Page = () => {
  const navigate = useNavigate();
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [buttonSize, setButtonSize] = useState(16);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [shake, setShake] = useState(false);
  const heartbeatRef = useRef(null);
  const [mouseTrails, setMouseTrails] = useState([]);
  const [deviceType, setDeviceType] = useState('desktop');
  const [currentImage, setCurrentImage] = useState(0);

  const yesButtonSize = buttonSize + Math.min(noCount * 20, 200);

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
    heartbeatRef.current = sounds.heartbeat;
    sounds.heartbeat.play();

    const handleMouseMove = (e) => {
      setMouseTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5)
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      sounds.heartbeat.stop();
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

  // Celebration Effects
  const createFirework = () => {
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff007f', '#ffb6c1'];
    const fireworkCount = 5;
    
    for (let i = 0; i < fireworkCount; i++) {
      setTimeout(() => {
        const originX = 0.2 + Math.random() * 0.6;
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { x: originX, y: 0.6 },
          colors,
          shapes: ['circle', 'square', 'heart'],
          scalar: 2,
          ticks: 100,
          gravity: 0.8,
          decay: 0.94,
          startVelocity: 30
        });
      }, i * 300);
    }
  };

  // Button Handlers
  const handleYesClick = () => {
    setYesPressed(true);
    sounds.success.play();
    setShowSparkles(true);
    
    const effectsInterval = setInterval(createFirework, 800);
    
    setTimeout(() => {
      navigate('/confirmed');
    }, 3500);

    return () => clearInterval(effectsInterval);
  };

  const handleNoClick = () => {
    sounds.no.play();
    setNoCount(noCount + 1);
    setButtonSize(buttonSize + Math.min(noCount * 5, 50));
    setShowHearts(true);
    setShake(true);
    
    setTimeout(() => setShake(false), 500);
    
    const newX = Math.random() * (window.innerWidth - 200);
    const newY = Math.random() * (window.innerHeight - 100);
    setPosition({ x: newX, y: newY });

    const newRate = Math.min(1 + noCount * 0.1, 2);
    sounds.heartbeat.rate(newRate);
  };

  const handleYesHover = () => {
    sounds.hover.play();
    sounds.sparkle.play();
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 animate-gradient overflow-hidden p-4">
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

      <div className="text-center space-y-8 relative w-full max-w-4xl mx-auto">
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
              <img 
                src={images[currentImage]}
                alt={`Love Memory ${currentImage + 1}`}
                className="h-64 md:h-96 object-cover rounded-xl w-full shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          animate={shake ? {
            x: [-10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
          } : {}}
          className="text-4xl md:text-7xl font-bold text-rose-600 drop-shadow-lg px-4"
        >
          Will you be my Valentine?
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 px-4">
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
              padding: `${Math.max(16, yesButtonSize/4)}px`,
              animation: showSparkles ? 'sparkle 1s ease infinite' : 'none'
            }}
            onClick={handleYesClick}
            onMouseEnter={handleYesHover}
          >
            Yes 🥰
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              bg-rose-500 hover:bg-rose-600 text-white text-lg px-8 py-4 rounded-lg
              transition-all transform absolute
              ${shake ? 'animate-shake' : ''}
              ${deviceType === 'mobile' ? 'text-xl' : ''}
            `}
            style={{
              left: position.x,
              top: position.y,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={handleNoClick}
            onMouseEnter={() => {
              sounds.hover.play();
              const newX = Math.random() * (window.innerWidth - 200);
              const newY = Math.random() * (window.innerHeight - 100);
              setPosition({ x: newX, y: newY });
            }}
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
