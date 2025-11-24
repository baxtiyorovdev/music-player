import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Plus, Menu } from 'lucide-react';
import type { Track } from '../types';

interface Props {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFavorite: (id: string) => void;
  setShowAddModal: (v: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (v: boolean) => void;
}

export default function Player({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  currentTime,
  duration,
  onSeek,
  toggleFavorite,
  setShowAddModal,
  showSidebar,
  setShowSidebar,
}: Props) {
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {!showSidebar && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSidebar(true)}
          className="fixed top-6 left-6 z-40 bg-black/60 backdrop-blur-xl p-3 rounded-full text-white shadow-lg hover:bg-black/80 transition"
        >
          <Menu size={24} />
        </motion.button>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="relative mb-6">
          <motion.img
            key={currentTrack.id}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full aspect-square rounded-2xl object-cover shadow-2xl"
          />
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <Heart
              size={24}
              className={currentTrack.favorite ? 'text-red-500' : 'text-white'}
              fill={currentTrack.favorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h2>
          <p className="text-gray-300">{currentTrack.artist}</p>
        </div>

        <div className="mb-6">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={onSeek}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-300 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onPrevious} className="p-3 rounded-full hover:bg-white/10 transition">
            <SkipBack size={28} className="text-white" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onTogglePlay} className="p-6 bg-white/90 rounded-full shadow-lg hover:shadow-xl transition hover:bg-white">
            {isPlaying ? (
              <Pause size={32} className="text-gray-900" fill="currentColor" />
            ) : (
              <Play size={32} className="text-gray-900" fill="currentColor" />
            )}
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onNext} className="p-3 rounded-full hover:bg-white/10 transition">
            <SkipForward size={28} className="text-white" />
          </motion.button>
        </div>
      </motion.div>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAddModal(true)} className="mt-6 bg-white/10 backdrop-blur-2xl p-4 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 text-white font-semibold border border-white/20 hover:bg-white/20">
        <Plus size={24} />
        <span>Add Track</span>
      </motion.button>
    </div>
  );
}
