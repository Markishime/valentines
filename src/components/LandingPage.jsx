import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-rose-100 border border-white overflow-hidden">
        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-0">
          {/* Left: text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-2">
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-rose-400">
                Valentine&apos;s Day • 2026
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-rose-700 leading-tight">
                A whole SM Seaside Cebu day, just for us. 💌
              </h1>
            </div>

            <p className="text-sm md:text-lg text-rose-600 max-w-xl">
              I turned our 2026 Valentine into a tiny website: Fantasy World, arcade, archery,
              and a quiet dinner by the sea — all planned, all for you.
            </p>

            <div className="flex flex-wrap gap-2 text-xs md:text-sm text-rose-500">
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                SM Seaside City Cebu
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                Fantasy World • Arcade • Archery
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-medium">
                Romantic dinner
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/love-language-game')}
                className="px-10 py-3.5 rounded-full bg-rose-500 text-white text-sm md:text-base font-semibold shadow-lg shadow-rose-300/80 border border-white/70"
              >
                Open your 2026 Valentine journey 💝
              </motion.button>
              <p className="text-xs md:text-sm text-rose-500 max-w-xs">
                We&apos;ll set our little 2026 mood first, then I&apos;ll show you the full SM Seaside plan.
              </p>
            </div>
          </motion.div>

          {/* Right: photo collage with 1–3 images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-bl from-rose-200/70 via-rose-100 to-rose-50 flex items-center justify-center p-6 md:p-8"
          >
            <div className="absolute inset-6 md:inset-10 rounded-3xl border border-white/60 border-dashed opacity-60" />

            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-4 md:-top-8 md:-left-6 text-xs md:text-sm text-rose-500 rotate-[-6deg]">
                us, 2026 ✨
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-rose-50">
                <img
                  src="/assets/images/1.jpg"
                  alt="Us at SM Seaside"
                  className="w-full h-64 md:h-80 object-contain"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-8 w-32 md:w-40 rounded-2xl overflow-hidden shadow-xl border border-white bg-white">
                <img
                  src="/assets/images/2.jpg"
                  alt="Sweet moment"
                  className="w-full h-28 md:h-32 object-contain"
                />
              </div>

              <div className="absolute -top-10 right-2 md:-top-12 md:right-4 w-24 md:w-28 rounded-2xl overflow-hidden shadow-md border border-white/90 rotate-6 bg-white">
                <img
                  src="/assets/images/3.jpg"
                  alt="Little candid"
                  className="w-full h-20 md:h-24 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
