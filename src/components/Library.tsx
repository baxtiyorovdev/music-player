import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Heart } from 'lucide-react';
import type { Track } from '../types';

interface Props {
  tracks: Track[];
  filteredTracks: Track[];
  currentTrackId: string;
  selectTrack: (t: Track) => void;
  toggleFavorite: (id: string) => void;
  showSidebar: boolean;
  setShowSidebar: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  showFavorites: boolean;
  setShowFavorites: (v: boolean) => void;
}

export default function Library({
  filteredTracks,
  currentTrackId,
  selectTrack,
  toggleFavorite,
  showSidebar,
  setShowSidebar,
  searchQuery,
  setSearchQuery,
  showFavorites,
  setShowFavorites,
}: Props) {
  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-80 bg-black/60 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl flex flex-col max-lg:absolute max-lg:left-4 max-lg:top-0 max-lg:h-full max-lg:z-50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">Library</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-xl"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowFavorites(false)}
              className={`flex-1 py-2 rounded-lg transition ${
                !showFavorites
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                showFavorites
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              <Heart size={16} fill={showFavorites ? 'currentColor' : 'none'} />
              Favorites
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {filteredTracks.map((track) => (
              <motion.div
                key={track.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => selectTrack(track)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                  currentTrackId === track.id
                    ? 'bg-white/20 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{track.title}</p>
                  <p className="text-gray-300 text-sm truncate">{track.artist}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track.id);
                  }}
                  className="text-gray-400 hover:text-red-400 transition"
                >
                  <Heart
                    size={18}
                    fill={track.favorite ? 'currentColor' : 'none'}
                    className={track.favorite ? 'text-red-500' : ''}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
