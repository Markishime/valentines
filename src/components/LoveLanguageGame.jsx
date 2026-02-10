import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LoveLanguageGame = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const moodTags = [
    'More hugs',
    'More photos together',
    'More holding hands',
    'More inside jokes',
    'More slow walks',
    'More late-night calls',
    'More forehead kisses',
    'More random \"I miss you\" texts',
    'More sunset walks',
    'More cuddles after long days',
    'More surprise dates',
    'More shared playlists',
    'More handwritten notes',
    'More sleepy good morning texts',
    'More coffee dates',
    'More slow dances in the living room',
    'More \"drive nowhere\" rides together',
    'More trying new food together',
    'More falling asleep on call',
    'More quiet moments just holding you'
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl mx-auto bg-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-rose-100 border border-white overflow-hidden">
        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-0">
          {/* Left: mood picker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 lg:p-12 space-y-6"
          >
            <div className="space-y-2">
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-rose-400">
                Step 1 • Our 2026 mood
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-rose-700">
                Choose the tiny things you want woven into our SM Seaside Valentine.
              </h1>
            </div>

            <p className="text-sm md:text-base text-rose-600 max-w-xl">
              No quiz, no scores — just soft wishes. These are the little promises we&apos;ll try
              to keep while we&apos;re in Fantasy World, the arcade, archery, and dinner.
            </p>

            <div className="space-y-3">
              <p className="text-xs md:text-sm text-rose-500 font-medium">
                Tap all the little things you want filling our 2026:
              </p>
              <div className="flex flex-wrap gap-2">
                {moodTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm border border-black transition-all ${
                        active
                          ? 'bg-rose-500 text-white shadow-sm shadow-rose-300'
                          : 'bg-rose-50/80 text-rose-600 hover:bg-rose-100'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-rose-50/90 border border-rose-100 p-4 md:p-5 space-y-2 text-sm md:text-base text-rose-700"
            >
              <p className="font-semibold text-rose-600">
                Our tiny 2026 love agreement
              </p>
              <p>
                No matter how busy SM Seaside is that day, we stay patient with each other, keep
                choosing kindness, and remember this: it&apos;s you and me, always on the same team.
              </p>
              {selectedTags.length > 0 && (
                <p className="text-rose-500 text-xs md:text-sm">
                  You chose:{' '}
                  <span className="font-medium">{selectedTags.join(' • ')}</span>
                </p>
              )}
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs md:text-sm text-rose-500 max-w-sm">
                When your heart feels ready, we&apos;ll see the full SM Seaside Cebu date —
                Fantasy World, arcade, archery, and our romantic dinner.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/valentine', { state: { moodTagsSelected: selectedTags } })}
                className="px-8 py-3 rounded-full bg-rose-500 text-white text-sm md:text-base font-semibold shadow-lg shadow-rose-300/70 border border-white/70"
              >
                See our 2026 SM Seaside date 💝
              </motion.button>
            </div>
          </motion.div>

          {/* Right: soft film strip using 4–6 images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-tl from-rose-200/70 via-rose-100 to-rose-50 flex items-center justify-center p-6 md:p-8"
          >
            <div className="absolute inset-6 md:inset-8 rounded-3xl border border-white/60 border-dashed opacity-60" />

            <div className="flex flex-col gap-4 w-full max-w-sm">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white">
                <img
                  src="/assets/images/4.jpg"
                  alt="Memory 1"
                  className="w-full h-32 md:h-40 object-contain"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white ml-6">
                <img
                  src="/assets/images/5.jpg"
                  alt="Memory 2"
                  className="w-full h-32 md:h-40 object-contain"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white mr-6">
                <img
                  src="/assets/images/6.jpg"
                  alt="Memory 3"
                  className="w-full h-32 md:h-40 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
