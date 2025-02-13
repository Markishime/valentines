import { Howl } from 'howler';
import { useEffect, useState, useRef } from 'react';

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(null);
  const soundRef = useRef(null);
  
  useEffect(() => {
    const initializeAudio = () => {
      try {
        if (!soundRef.current) {
          soundRef.current = new Howl({
            src: ['src/assets/sounds/Valentine.mp3'], // Proper public path
            loop: true,
            volume: 0.5,
            html5: true,
            onload: () => {
              console.log('Music loaded successfully');
              setError(null);
              if (playing) {
                soundRef.current.play();
              }
            },
            onloaderror: (id, err) => {
              console.error('Error loading music:', err);
              setError('Could not load music file. Please check if the file exists.');
            },
            onplayerror: (id, err) => {
              console.error('Error playing music:', err);
              setError('Could not play music. Try clicking the play button again.');
            }
          });
        }
      } catch (err) {
        console.error('Error initializing audio:', err);
        setError('Failed to initialize audio player.');
      }
    };

    initializeAudio();

    // Cleanup on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
        soundRef.current = null;
      }
    };
  }, []); // Only run once on mount

  const togglePlay = () => {
    try {
      if (!soundRef.current) {
        setError('Audio player not initialized. Please refresh the page.');
        return;
      }

      if (playing) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
      setPlaying(!playing);
      setError(null);
    } catch (err) {
      console.error('Error toggling playback:', err);
      setError('Failed to toggle playback.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
      {error && (
        <div className="text-red-500 bg-white/80 backdrop-blur-md p-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <button 
        onClick={togglePlay}
        className="backdrop-blur-md bg-white/30 hover:bg-white/40 p-3 rounded-full transition-all z-50"
      >
        {playing ? '🔊' : '🔈'}
      </button>
    </div>
  );
};
