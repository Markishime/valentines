import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';

// Sound effects
const soundEffects = {
  click: new Howl({ src: ['/assets/images/sounds/click.mp3'], volume: 0.5 }),
  success: new Howl({ src: ['/assets/sounds/success.mp3'], volume: 0.5 }),
  complete: new Howl({ src: ['/assets/sounds/complete.mp3'], volume: 0.5 })
};

const questions = [
  {
    question: "What's your preferred way to express love?",
    gif: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
    options: [
      { answer: 'Words of Affirmation', score: { words: 5, acts: 2, gifts: 1, time: 3, touch: 2 }, description: "You express love through heartfelt words and compliments" },
      { answer: 'Acts of Service', score: { words: 2, acts: 5, gifts: 3, time: 2, touch: 1 }, description: "You show love by helping and doing things for others" },
      { answer: 'Receiving Gifts', score: { words: 1, acts: 2, gifts: 5, time: 3, touch: 2 }, description: "You express love through thoughtful gifts and surprises" },
      { answer: 'Quality Time', score: { words: 3, acts: 2, gifts: 1, time: 5, touch: 3 }, description: "You value spending meaningful time together" },
      { answer: 'Physical Touch', score: { words: 2, acts: 1, gifts: 2, time: 3, touch: 5 }, description: "You express love through hugs and physical closeness" },
    ],
    explanation: "Understanding how you express love helps strengthen your relationship! 💕"
  },
  {
    question: "How do you prefer to receive love?",
    gif: "https://media.giphy.com/media/LnKM6jbBenbVXp1qA9/giphy.gif",
    options: [
      { answer: 'Gifts', score: { words: 1, acts: 2, gifts: 5, time: 2, touch: 1 }, description: "You feel loved when receiving thoughtful presents" },
      { answer: 'Quality Time', score: { words: 2, acts: 2, gifts: 1, time: 5, touch: 3 }, description: "You feel loved when someone dedicates time to you" },
      { answer: 'Acts of Service', score: { words: 2, acts: 5, gifts: 2, time: 2, touch: 1 }, description: "You appreciate when others help you with tasks" },
      { answer: 'Physical Touch', score: { words: 1, acts: 2, gifts: 1, time: 3, touch: 5 }, description: "You feel loved through physical affection" },
      { answer: 'Words of Affirmation', score: { words: 5, acts: 2, gifts: 1, time: 2, touch: 2 }, description: "You value verbal expressions of love" },
    ],
    explanation: "Knowing how you receive love helps your partner show love in ways meaningful to you! 💝"
  },
  {
    question: "What's your ideal romantic date?",
    gif: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif",
    options: [
      { answer: 'Cozy Movie Night', score: { words: 2, acts: 1, gifts: 1, time: 5, touch: 4 }, description: "Snuggling and watching movies together" },
      { answer: 'Adventure Date', score: { words: 1, acts: 3, gifts: 2, time: 5, touch: 2 }, description: "Trying new experiences together" },
      { answer: 'Romantic Dinner', score: { words: 4, acts: 2, gifts: 3, time: 4, touch: 2 }, description: "Sharing a special meal and conversation" },
      { answer: 'Creative Activity', score: { words: 2, acts: 4, gifts: 3, time: 4, touch: 1 }, description: "Making something together" },
      { answer: 'Simple Walk', score: { words: 3, acts: 1, gifts: 1, time: 5, touch: 3 }, description: "Just enjoying each other's company" },
    ],
    explanation: "Your ideal date reveals how you like to connect with your partner! 💫"
  },
  {
    question: "How do you comfort your partner when they're sad?",
    gif: "https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif",
    options: [
      { answer: 'Give them a big hug', score: { words: 1, acts: 2, gifts: 1, time: 3, touch: 5 }, description: "Physical comfort is your go-to method" },
      { answer: 'Listen and encourage', score: { words: 5, acts: 2, gifts: 1, time: 4, touch: 2 }, description: "You provide emotional support through words" },
      { answer: 'Make their favorite meal', score: { words: 2, acts: 5, gifts: 3, time: 3, touch: 1 }, description: "You show care through thoughtful actions" },
      { answer: 'Buy them something special', score: { words: 2, acts: 2, gifts: 5, time: 2, touch: 1 }, description: "You give gifts to lift their spirits" },
      { answer: 'Stay by their side', score: { words: 2, acts: 2, gifts: 1, time: 5, touch: 3 }, description: "Your presence is your comfort" },
    ],
    explanation: "Your comforting style shows how you naturally express care! 🤗"
  },
  {
    question: "What makes you feel most appreciated?",
    gif: "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif",
    options: [
      { answer: 'Surprise gifts', score: { words: 1, acts: 2, gifts: 5, time: 2, touch: 1 }, description: "Thoughtful presents mean the world to you" },
      { answer: 'Loving messages', score: { words: 5, acts: 2, gifts: 1, time: 2, touch: 2 }, description: "Sweet words touch your heart" },
      { answer: 'Undivided attention', score: { words: 2, acts: 1, gifts: 1, time: 5, touch: 3 }, description: "Having someone's full focus matters most" },
      { answer: 'Helpful gestures', score: { words: 2, acts: 5, gifts: 2, time: 2, touch: 1 }, description: "Actions speak louder than words" },
      { answer: 'Physical affection', score: { words: 1, acts: 1, gifts: 1, time: 3, touch: 5 }, description: "Hugs and kisses make you feel loved" },
    ],
    explanation: "Understanding appreciation helps build stronger bonds! 💖"
  }
];

const loveLanguageDescriptions = {
  words: {
    high: "Words of affirmation are your primary love language! You deeply value verbal expressions of love and appreciation. Sweet messages, kind words, and verbal encouragement mean the world to you. 💌",
    medium: "You appreciate kind words and verbal affirmation, though it's not your primary love language. Encouragement and compliments positively impact you. 💭",
    low: "While you value all expressions of love, words of affirmation aren't your main focus. You prefer more tangible or active expressions of love. 📝"
  },
  acts: {
    high: "Acts of service speak volumes to you! You feel most loved when others take action to help or support you. Thoughtful gestures and helpful actions make your heart sing. 🌟",
    medium: "You appreciate when others help you out, though it's not your primary need. Helpful actions contribute to your feeling of being loved. 🤝",
    low: "While you appreciate help from others, you don't necessarily need acts of service to feel loved. Other expressions of love resonate more strongly with you. 🔧"
  },
  gifts: {
    high: "Receiving gifts is your love language! Thoughtful presents and surprises make you feel especially loved and appreciated. It's not about the value, but the thought behind the gift. 🎁",
    medium: "You enjoy receiving thoughtful gifts, though they're not essential to feeling loved. Presents add joy to your relationship. 🎀",
    low: "While you appreciate gifts, they're not your primary way of feeling loved. You value other expressions of love more deeply. 🎈"
  },
  time: {
    high: "Quality time is your love language! You cherish moments spent together and value undivided attention. Meaningful conversations and shared experiences fill your love tank. ⭐",
    medium: "You enjoy spending quality time together, though you balance it with other expressions of love. Shared moments enhance your relationships. 🕰️",
    low: "While you enjoy spending time together, you don't necessarily need constant companionship to feel loved. Other expressions of love speak more to you. ⏳"
  },
  touch: {
    high: "Physical touch is your primary love language! Hugs, kisses, and physical closeness make you feel most loved and connected. Physical affection is essential for you. 💝",
    medium: "You appreciate physical affection as part of a balanced expression of love. Touch adds warmth to your relationships. 🤗",
    low: "While you accept physical affection, it's not your main way of experiencing love. Other expressions of love resonate more strongly with you. 👐"
  }
};

export const LoveLanguageGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scores, setScores] = useState({
    words: 0,
    acts: 0,
    gifts: 0,
    time: 0,
    touch: 0
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setProgress((currentQuestion / questions.length) * 100);
  }, [currentQuestion]);

  const handleAnswer = (option) => {
    soundEffects.click.play();
    setSelectedAnswer(option);
    setShowAnimation(true);
    setShowExplanation(true);

    setScores(prev => ({
      words: prev.words + option.score.words,
      acts: prev.acts + option.score.acts,
      gifts: prev.gifts + option.score.gifts,
      time: prev.time + option.score.time,
      touch: prev.touch + option.score.touch
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setShowAnimation(false);
      } else {
        soundEffects.complete.play();
        setShowResults(true);
        celebrateCompletion();
      }
    }, 2000);
  };

  const celebrateCompletion = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff007f'];

    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(interval);
        // Navigate to Valentine page after celebration
        setTimeout(() => {
          navigate('/valentine');
        }, 1000);
        return;
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 2
      });
    }, 200);
  };

  const getLanguageLevel = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  };

  const getDetailedAnalysis = () => {
    const maxPossibleScore = questions.length * 5;
    const analysis = {};
    Object.keys(scores).forEach(language => {
      const level = getLanguageLevel(scores[language], maxPossibleScore);
      analysis[language] = loveLanguageDescriptions[language][level];
    });
    return analysis;
  };

  if (showResults) {
    const analysis = getDetailedAnalysis();
    const maxScore = Math.max(...Object.values(scores));
    const primaryLanguages = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([language]) => language);

    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-8">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center">Your Love Language Results</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-rose-500 mb-4">
              Your Primary Love {primaryLanguages.length > 1 ? 'Languages are' : 'Language is'}:
            </h3>
            <div className="flex flex-wrap gap-4">
              {primaryLanguages.map(language => (
                <div key={language} className="bg-rose-100 p-4 rounded-lg">
                  <p className="text-xl font-medium text-rose-600 capitalize">
                    {language === 'words' ? 'Words of Affirmation' :
                     language === 'acts' ? 'Acts of Service' :
                     language === 'gifts' ? 'Receiving Gifts' :
                     language === 'time' ? 'Quality Time' :
                     'Physical Touch'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(analysis).map(([language, description]) => (
              <div key={language} className="bg-white/60 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-rose-500 mb-2 capitalize">
                  {language === 'words' ? 'Words of Affirmation' :
                   language === 'acts' ? 'Acts of Service' :
                   language === 'gifts' ? 'Receiving Gifts' :
                   language === 'time' ? 'Quality Time' :
                   'Physical Touch'}
                </h4>
                <p className="text-gray-700">{description}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-rose-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(scores[language] / (questions.length * 5)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Now that you know your love language, let's continue with a special surprise!</p>
            <button
              onClick={() => navigate('/valentine')}
              className="bg-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-600 transform hover:scale-105 transition-all"
            >
              Continue to Surprise ❤️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl">
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4">
              {questions[currentQuestion].question}
            </h2>
            {questions[currentQuestion].gif && (
              <img
                src={questions[currentQuestion].gif}
                alt="Question illustration"
                className="w-full max-w-md mx-auto rounded-lg mb-6"
              />
            )}
          </div>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg text-left transition-all transform hover:scale-102 ${
                  selectedAnswer === option
                    ? 'bg-rose-500 text-white'
                    : 'bg-white hover:bg-rose-100'
                } ${showAnimation && selectedAnswer === option ? 'animate-pulse' : ''}`}
              >
                {option.answer}
              </button>
            ))}
          </div>

          {showExplanation && selectedAnswer && (
            <div className="mt-6 p-4 bg-rose-100 rounded-lg">
              <p className="text-rose-700">{selectedAnswer.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
