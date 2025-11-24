import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tracks } from './songs';
import Library from './components/Library';
import Player from './components/Player';
import AddTrackModal from './components/AddTrackModal';
import type { Track, AddMethod } from './types';

export default function App() {
  const [tracks, setTracks] = useState<Track[]>(Tracks);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addMethod, setAddMethod] = useState<AddMethod>(null);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackArtist, setNewTrackArtist] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log('Play error:', err));
      }
    }
  }, [currentTrack.id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Play error:', err);
          setIsPlaying(false);
        });
    }
  };

  const handlePrevious = useCallback(() => {
    setTracks((prev) => {
      const currentIndex = prev.findIndex((t) => t.id === currentTrack.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : prev.length - 1;
      const prevTrack = prev[prevIndex];
      setCurrentTrack(prevTrack);
      return prev;
    });
    setIsPlaying(true);
  }, [currentTrack.id]);

  const handleNext = useCallback(() => {
    setTracks((prev) => {
      const currentIndex = prev.findIndex((t) => t.id === currentTrack.id);
      const nextIndex = currentIndex < prev.length - 1 ? currentIndex + 1 : 0;
      const nextTrack = prev[nextIndex];
      setCurrentTrack(nextTrack);
      return prev;
    });
    setIsPlaying(true);
  }, [currentTrack.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleNext]);

  const toggleFavorite = (trackId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((t) =>
        t.id === trackId ? { ...t, favorite: !t.favorite } : t
      )
    );
    if (currentTrack.id === trackId) {
      setCurrentTrack((prev) => ({ ...prev, favorite: !prev.favorite }));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleAddTrack = () => {
    if (addMethod === "url" && newTrackUrl && newTrackTitle) {
      const newTrack: Track = {
        id: Date.now().toString(),
        title: newTrackTitle,
        artist: newTrackArtist || "Unknown Artist",
        cover:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
        url: newTrackUrl,
        favorite: false,
      };
      setTracks([...tracks, newTrack]);
      resetAddModal();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      const newTrack: Track = {
        id: Date.now().toString(),
        title: newTrackTitle || file.name.replace(/\.[^/.]+$/, ""),
        artist: newTrackArtist || "Unknown Artist",
        cover:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
        url: url,
        favorite: false,
      };
      setTracks([...tracks, newTrack]);
      resetAddModal();
    }
  };

  const resetAddModal = () => {
    setShowAddModal(false);
    setAddMethod(null);
    setNewTrackUrl("");
    setNewTrackTitle("");
    setNewTrackArtist("");
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const filteredTracks = tracks.filter((track) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = track.title.toLowerCase().includes(q) || track.artist.toLowerCase().includes(q);
    const matchesFavorite = !showFavorites || track.favorite;
    return matchesSearch && matchesFavorite;
  });
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <motion.div key={currentTrack.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentTrack.cover})`, filter: 'blur(80px) brightness(0.6)', transform: 'scale(1.2)' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 50%, rgba(0,0,0,0.4))' }}
        />
      </motion.div>

      <audio ref={audioRef} preload="metadata" />

      <div className="w-full max-w-7xl flex gap-4 h-[90vh] relative z-10">
        <Library
          tracks={tracks}
          filteredTracks={filteredTracks}
          currentTrackId={currentTrack.id}
          selectTrack={selectTrack}
          toggleFavorite={toggleFavorite}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />

        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          toggleFavorite={toggleFavorite}
          setShowAddModal={setShowAddModal}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>

      <AddTrackModal
        show={showAddModal}
        addMethod={addMethod}
        setAddMethod={setAddMethod}
        newTrackUrl={newTrackUrl}
        setNewTrackUrl={setNewTrackUrl}
        newTrackTitle={newTrackTitle}
        setNewTrackTitle={setNewTrackTitle}
        newTrackArtist={newTrackArtist}
        setNewTrackArtist={setNewTrackArtist}
        handleAddTrack={handleAddTrack}
        handleFileUpload={handleFileUpload}
        resetAddModal={resetAddModal}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
        .slider::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .slider::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: white; cursor: pointer; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
      `}</style>
    </div>
  );
}