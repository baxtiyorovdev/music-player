import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Link, Upload } from 'lucide-react';
import type { AddMethod } from '../types';

interface Props {
  show: boolean;
  addMethod: AddMethod;
  setAddMethod: (m: AddMethod) => void;
  newTrackUrl: string;
  setNewTrackUrl: (s: string) => void;
  newTrackTitle: string;
  setNewTrackTitle: (s: string) => void;
  newTrackArtist: string;
  setNewTrackArtist: (s: string) => void;
  handleAddTrack: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetAddModal: () => void;
}

export default function AddTrackModal({
  show,
  addMethod,
  setAddMethod,
  newTrackUrl,
  setNewTrackUrl,
  newTrackTitle,
  setNewTrackTitle,
  newTrackArtist,
  setNewTrackArtist,
  handleAddTrack,
  handleFileUpload,
  resetAddModal,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => resetAddModal()}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Add New Track</h3>
              <button onClick={() => resetAddModal()} className="text-gray-300 hover:text-white transition"><X size={24} /></button>
            </div>

            {!addMethod ? (
              <div className="space-y-4">
                <button onClick={() => setAddMethod('url')} className="w-full bg-white/20 text-white py-4 rounded-xl hover:bg-white/30 transition flex items-center justify-center gap-3 font-semibold backdrop-blur-xl"><Link size={24} />Add from URL</button>
                <button onClick={() => setAddMethod('file')} className="w-full bg-white/20 text-white py-4 rounded-xl hover:bg-white/30 transition flex items-center justify-center gap-3 font-semibold backdrop-blur-xl"><Upload size={24} />Upload File</button>
              </div>
            ) : addMethod === 'url' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Track URL</label>
                  <input type="url" value={newTrackUrl} onChange={(e) => setNewTrackUrl(e.target.value)} placeholder="https://example.com/track.mp3" className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
                  <input type="text" value={newTrackTitle} onChange={(e) => setNewTrackTitle(e.target.value)} placeholder="Track title" className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Artist</label>
                  <input type="text" value={newTrackArtist} onChange={(e) => setNewTrackArtist(e.target.value)} placeholder="Artist name" className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-xl" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setAddMethod(null)} className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition font-semibold">Back</button>
                  <button onClick={handleAddTrack} className="flex-1 py-3 bg-white/30 text-white rounded-xl hover:bg-white/40 transition font-semibold">Add Track</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Title (optional)</label>
                  <input type="text" value={newTrackTitle} onChange={(e) => setNewTrackTitle(e.target.value)} placeholder="Track title" className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-xl mb-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Artist (optional)</label>
                  <input type="text" value={newTrackArtist} onChange={(e) => setNewTrackArtist(e.target.value)} placeholder="Artist name" className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-xl mb-4" />
                </div>
                <label className="w-full flex flex-col items-center gap-4 py-8 border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 transition cursor-pointer hover:bg-white/5">
                  <Upload size={48} className="text-gray-300" />
                  <span className="text-gray-200 font-medium">Drop audio file or click to upload</span>
                  <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                </label>
                <button onClick={() => setAddMethod(null)} className="w-full py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition font-semibold">Back</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
